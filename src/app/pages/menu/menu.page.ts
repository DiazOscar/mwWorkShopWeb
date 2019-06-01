import { Component, OnInit } from '@angular/core';
import { DamagesService } from 'src/app/services/damages.service';
import { DamageService } from 'src/app/services/damage.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public damages;

  constructor(private damageFService: DamagesService,
     private damageService: DamageService,
     private router: Router) { }

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
    let navigationExtras: NavigationExtras = {
      state: {
        incidence: inc
      }
    };

    this.router.navigate(['/damage-details'], navigationExtras);
  }

  deleteDamage(inc){
    this.damageFService.deleteIncidence(inc.id);
  }

  goUsers(){
    this.router.navigate(['/users']);
  }

  goBudget(inc){
    let navigationExtras: NavigationExtras = {
      state: {
        incidence: inc
      }
    };
    this.router.navigate(['/budget'], navigationExtras);
  }

}
