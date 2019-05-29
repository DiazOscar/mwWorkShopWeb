import { Component, OnInit } from '@angular/core';
import { DamagesService } from 'src/app/services/damages.service';
import { DamageService } from 'src/app/services/damage.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public damages;

  constructor(private damageFService: DamagesService,
     private damageService: DamageService,
     private navCtrl: NavController) { }

  ngOnInit() {

    this.damageFService.getAllIncidence().subscribe(data => {
      this.damages = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      })
    });
  }

  goDamage(inc){
    console.log(inc);
    this.damageService.damage.id = inc.id;
    this.damageService.damage.car = inc.car;
    this.damageService.damage.date = inc.date;

    this.navCtrl.navigateForward((['/damage-details']));
  }

  deleteDamage(inc){
    this.damageFService.deleteIncidence(inc.id);
  }

  goUsers(){
    this.navCtrl.navigateForward((['/users']));
  }

}
