import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-summarypdf',
  templateUrl: './summarypdf.page.html',
  styleUrls: ['./summarypdf.page.scss'],
})
export class SummarypdfPage implements OnInit {

  @ViewChild('pdf') content: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  savePdf() {
   // let doc = new jsPDF();

    let specialElementHandlers = {
      '#editor': function(element, renderer) {
        return true;
      }
    };

    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('test.pdf');
  }

}
