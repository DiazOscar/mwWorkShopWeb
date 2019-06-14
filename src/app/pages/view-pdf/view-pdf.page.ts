import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.page.html',
  styleUrls: ['./view-pdf.page.scss'],
})
export class ViewPdfPage implements OnInit {

  data: any;
  task: AngularFireUploadTask;
  ref: AngularFireStorageReference;
  subject: any;
  body: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private storageAng: AngularFireStorage,
    private emailComposer: EmailComposer, private toastCtrl: ToastController) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.datos;
        console.log(this.data);
      }

      if(this.data.details.damages.length > 9){

      }
    });
  }

  ngOnInit(): void {
    this.subject = 'Presupuesto del vehiculo '+this.data.vehiculo.enrollment;
    this.body = 'Buenas '+this.data.cliente.name+ ', en el siguiente enlace dispone del presupuesto de su vehiculo. \n\n';
  }

  async exportPdf(opcion) {
    const div = document.getElementById("pdf");
    const options = { background: "white", height: 845, width: 595 };
    domtoimage.toPng(div, options).then((dataUrl) => {
      //Initialize JSPDF
      var doc = new jsPDF("p", "mm", "a4");
      //Add image Url to PDF
      doc.addImage(dataUrl, 'PNG', 0, 0, 210, 340);

      switch (opcion) {
        case 1:
          doc.save(this.data.averia.id + ".pdf");
          break;
        case 2:
          if (this.subject.length == 0 || this.data.cliente.email.length == 0) {
            this.toast('El mensaje del cliente y cabecera deben de estar rellenos');
          } else {
          let blob = doc.output('blob');
          console.log(blob);
          setTimeout(() => {
            let name = this.data.averia.id + ".pdf"
            this.ref = this.storageAng.ref(name);
            this.task = this.storageAng.ref(name).put(blob);

            this.task
              .snapshotChanges()
              .pipe(
                finalize(() => {
                  this.ref.getDownloadURL().subscribe(dataUrl => {
                    let url = dataUrl;
                    console.log(url)
                    let email = {
                      to: this.data.cliente.email,
                      cc: 'oddmworkshop@gmail.com',
                      subject: this.subject,
                      body: this.body + dataUrl,
                      isHtml: true
                    };

                    this.emailComposer.open(email);
                  });
                })
              )
              .subscribe();
          }, 500);
      }
    }
    })
      .catch(function (error) {

      });
  }

  back() {
    this.router.navigate(["/menu"]);
  }

  async toast(message: any) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: 'light',
      duration: 2000,
      mode: 'ios',
      cssClass: 'toastcss',
    });

    toast.present();
  }

}
