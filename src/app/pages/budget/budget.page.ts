import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss'],
})
export class BudgetPage implements OnInit {

  rows = [];

  ivaF: string;
  totalF: string;
  totalIva: string;

  data: any;
  details: any;

  constructor(private route: ActivatedRoute, private router: Router, private detailsService: DetailsService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.incidence;
        console.log(this.data);
      }
    });
  }

  ngOnInit() {
    this.detailsService.getDetail(this.data.id).subscribe((det) =>{
      this.details = det.payload.data()
      console.log(this.details);
   });
  }

  addRow() {
    this.rows.push({desc: "",
                    amount: ""
                  })
    console.log(this.rows);
  }

  removeRow(row){
    this.rows.splice(row, 1);
    this.total();
  }

  total(){
    let iva: number = 0;
    let cant: number = 0;
    for(let row of this.rows){
      console.log(row);
      cant += row.price * row.amount;
      iva += (row.price * row.amount) * 0.21;
    }
    this.totalF = String(cant);
    this.ivaF = String(Math.round(iva*100)/100);
    this.totalIva = String(cant + iva);
    console.log(this.totalF);
  }

}
