import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.page.html',
  styleUrls: ['./view-pdf.page.scss'],
})
export class ViewPdfPage implements OnInit {

  ngOnInit(): void {
    this.exportPdf();
  }
  
  

  loading: any;

  constructor() {
  }

  async exportPdf() {
const div = document.getElementById("pdf");
    const options = { background: "white", height: 595, width: 845 };
    domtoimage.toPng(div, options).then((dataUrl)=> {
        //Initialize JSPDF
        var doc = new jsPDF("p","mm","a4");
        //Add image Url to PDF
        doc.addImage(dataUrl, 'PNG', 0, 0, 210, 180);

        doc.save("prueba.pdf");


    })
    .catch(function (error) {
        this.loading.dismiss();
        console.error('oops, something went wrong!', error);
    });
  }

}
