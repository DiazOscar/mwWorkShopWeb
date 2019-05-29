import { Component, OnInit } from '@angular/core';
import { DamageService } from 'src/app/services/damage.service';

@Component({
  selector: 'app-damage-details',
  templateUrl: './damage-details.page.html',
  styleUrls: ['./damage-details.page.scss'],
})
export class DamageDetailsPage implements OnInit {

  constructor(public damageService: DamageService) { }

  ngOnInit() {

    console.log(this.damageService);
  }

}
