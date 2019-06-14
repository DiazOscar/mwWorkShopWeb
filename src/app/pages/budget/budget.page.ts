import { Component, OnInit, ViewChild, ElementRef, Renderer2, ViewChildren  } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { DetailsService } from 'src/app/services/details.service';
import { CustomerService } from 'src/app/services/customer.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ToastController, NavController } from '@ionic/angular';



@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss'],
})
export class BudgetPage implements OnInit {
  @ViewChildren('inputs') myInput;

  data: any;
  vehicle: any;
  customer: any;
  details: any;
  budget = {
    rows: [],

    ivaF: '',
    totalF: '',
    totalIva: ''
  };

  constructor(private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private vehicleService: VehicleService,
    private detailsService: DetailsService, private toastCtrl: ToastController , private renderer: Renderer2) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.incidence;
        console.log(this.data);
      }
    });

    setTimeout(() => {
      this.detailsService.getDetail(this.data.id).subscribe((det) => {
        this.details = det.payload.data();
        console.log(this.details);
      });
    }, 350);

  }

  ngOnInit() {
    this.vehicleService.getVehicle(this.data.car).subscribe((veh) => {
      this.vehicle = veh.payload.data();
      console.log(this.vehicle);
    });

    setTimeout(() => {
      this.customerService.getCustomer(this.vehicle.owner).subscribe((cus) => {
        this.customer = cus.payload.data();
        console.log(this.customer);
      });
    }, 350);

  }

  addRow() {

    this.budget.rows.push({
      desc: '',
      amount: 1,
      price: 0,
    });

    setTimeout(() => {
      this.myInput.changes.subscribe((items: Array<any>) => {
        items.forEach((item: any) => item.setFocus());
      });
    }, 500);
  }

  removeRow(row) {
    this.budget.rows.splice(row, 1);
    this.total();
  }

  total() {
    let iva: number = 0;
    let cant: number = 0;
    for (let row of this.budget.rows) {
      console.log(row);
      cant += row.price * row.amount;
      iva += (row.price * row.amount) * 0.21;
    }
    this.budget.totalF = String(cant.toFixed(2));
    this.budget.ivaF = String((Math.round(iva * 100) / 100).toFixed(2));
    this.budget.totalIva = String(Math.round(cant + iva).toFixed(2));
    console.log(this.budget.totalF,this.budget.ivaF, this.budget.totalIva);
  }

  goPDF() {
    if (this.budget.rows.length == 0) {
      this.toast('Debes de rellenar el presupuesto');
    } else if (this.checkDescription()) {
      this.toast('Tienes que rellenar todos los campos');
    } else if (this.checkPrice()) {
      this.toast('Los precios no pueden estar a 0');
    } else {
      let datos = {
        averia: this.data,
        detalles: this.details,
        cliente: this.customer,
        vehiculo: this.vehicle,
        budget: this.budget
      };

      let navigationExtras: NavigationExtras = {
        state: {
          datos: datos
        }
      };

      this.router.navigate(['/view-pdf'], navigationExtras);
      console.log(navigationExtras);
    }
  }

  checkDescription(): Boolean {
    let answer: Boolean = false;
    for (let bu of this.budget.rows) {
      if (bu.desc.length == 0) {
        answer = true;
        break;
      }
    }
    return answer;
  }

  checkPrice(): Boolean {
    let answer: Boolean = false;
    for (let bu of this.budget.rows) {
      if (bu.price == 0) {
        answer = true;
        break;
      }
    }
    return answer;
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

  back() {
    this.router.navigate(['/menu']);
  }

  checkPriceChange(i: number) {
    if (this.budget.rows[i].price > 100000) {
      this.budget.rows[i].price = 0;
    }
    
    //this.renderer.selectRootElement(this.myInput.nativeElement).focus();
  }

  checkUnits(i: number) {
    if (this.budget.rows[i].amount > 100) {
      this.budget.rows[i].amount = 0;
    }
  }

}
