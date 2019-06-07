import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
      this.detailsService.getDetail(this.data.id).subscribe( (det) => {
      this.details = det.payload.data()
      console.log(this.details)
    });
    }, 300);
    
  

  }

  ngOnInit() {

    this.vehicleService.getVehicle(this.data.car).subscribe((veh) =>{
      this.vehicle = veh.payload.data()
      console.log(this.vehicle);
   });

   this.canvasElement = this.canvas.nativeElement;
   this.setBackgroundImage();
   this.canvasElement.width = document.body.clientWidth*3/ 5;
   this.canvasElement.height = (document.body.clientHeight*4)/12;
   this.ctx = this.canvasElement.getContext('2d');

   setTimeout(() => {
     this.customerService.getCustomer(this.vehicle.owner).subscribe((cus) =>{
       this.customer = cus.payload.data()
       console.log(this.customer);
     })
   }, 350);


    console.log(this.details);
    console.log(this.vehicle);
    console.log(this.customer);


  }

  setBackgroundImage(){
    let context = this.canvasElement.getContext("2d");

    var background = new Image();
    background.src = this.data.imagePath;

    background.onload = function(){
      context.drawImage(background,0,0, document.body.clientWidth*3/5, (document.body.clientHeight*4)/12);   
    }
  }

  comeback(){
    this.router.navigate(["/menu"]);
  }

}
