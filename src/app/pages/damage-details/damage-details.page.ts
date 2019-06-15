import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-damage-details',
  templateUrl: './damage-details.page.html',
  styleUrls: ['./damage-details.page.scss'],
})
export class DamageDetailsPage implements OnInit {

  data: any;
  vehicle: any;
  customer: any;
  details: any;

  @ViewChild('myCanvas') canvas: any;
  canvasElement: any;
  ctx;
  x: any;

  constructor(private route: ActivatedRoute, private router: Router, private customerService: CustomerService,
              private vehicleService: VehicleService, private detailsService: DetailsService) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.incidence;
      }
    });

    setTimeout(() => {
      this.detailsService.getDetail(this.data.id).subscribe( (det) => {
      this.details = det.payload.data();
    });
    }, 300);
  }

  ngOnInit() {

    this.vehicleService.getVehicle(this.data.car).subscribe((veh) => {
      this.vehicle = veh.payload.data();
   });

    setTimeout (() => {
      this.customerService.getCustomer(this.vehicle.owner).subscribe( (cus) => {
      this.customer = cus.payload.data();
    });
    }, 350);
  }

  setBackgroundImage(){
    let context = this.canvasElement.getContext('2d');

    var background = new Image();
    background.src = this.data.imagePath;

    background.onload = function() {
      context.drawImage(background, 0, 0, document.body.clientWidth * 8 / 20, (document.body.clientHeight * 4) / 12);
    }
  }

  comeback() {
    this.router.navigate(['/menu']);
  }

  goBudget() {
      let navigationExtras: NavigationExtras = {
        state: {
          incidence: this.data
        }
      };
      this.router.navigate(['/budget'], navigationExtras);
    }
}
