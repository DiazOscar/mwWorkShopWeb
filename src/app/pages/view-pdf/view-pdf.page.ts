import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.page.html',
  styleUrls: ['./view-pdf.page.scss'],
})
export class ViewPdfPage implements OnInit {

  data: any;
 
  constructor(private route: ActivatedRoute,
    private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.datos;
        console.log(this.data);
      }
    });
  }

  ngOnInit(): void {
  }

  async exportPdf() {
    const div = document.getElementById("pdf");
    const options = { background: "white", height: 766.5, width: 654 };
    domtoimage.toPng(div, options).then((dataUrl)=> {
        //Initialize JSPDF
        var doc = new jsPDF("p","mm","a4");
        //Add image Url to PDF
        doc.addImage(dataUrl, 'PNG', 0, 0, 220, 295);

        doc.save("prueba.pdf");

    })
    .catch(function (error) {

    });
  }

  back(){
    this.router.navigate(["/menu"])
  }

}
