import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { DetailsService } from 'src/app/services/details.service';
import { CustomerService } from 'src/app/services/customer.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss'],
})
export class BudgetPage implements OnInit {

  data: any;
  vehicle: any;
  customer: any;
  details: any;

  rows = [];

  ivaF: string;
  totalF: string;
  totalIva: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private customerService:CustomerService,
    private vehicleService: VehicleService,
    private detailsService: DetailsService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.incidence;
        console.log(this.data);
      }
    });

    setTimeout(() => {
      this.detailsService.getDetail(this.data.id).subscribe((det) =>{
      this.details = det.payload.data()
      console.log(this.details);
   });
    }, 350);
    
  }

  ngOnInit() {
    this.vehicleService.getVehicle(this.data.car).subscribe((veh) =>{
      this.vehicle = veh.payload.data()
      console.log(this.vehicle);
   });

   setTimeout(() => {
    this.customerService.getCustomer(this.vehicle.owner).subscribe((cus) =>{
      this.customer = cus.payload.data()
      console.log(this.customer);
    })
  }, 350);
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

  goPDF(){
    let datos = {
      averia: this.data,
      detalles: this.details,
      cliente: this.customer,
      vehiculo: this.vehicle,
      budget: this.rows
    }

    let navigationExtras: NavigationExtras = {
      state:{
        datos: datos  
      }       
    };

    this.router.navigate(['/view-pdf'], navigationExtras);
    console.log(navigationExtras);
  }

}
