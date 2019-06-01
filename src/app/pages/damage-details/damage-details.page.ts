import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-damage-details',
  templateUrl: './damage-details.page.html',
  styleUrls: ['./damage-details.page.scss'],
})
export class DamageDetailsPage implements OnInit {

  data: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.incidence;
        console.log(this.data);
      }
    });
   }

  ngOnInit() {

    console.log();
  }

}
