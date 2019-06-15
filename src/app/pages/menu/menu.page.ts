import { Component, OnInit } from '@angular/core';
import { DamagesService } from 'src/app/services/damages.service';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public damages;

  constructor(private damageFService: DamagesService, private router: Router, public afAuth: AngularFireAuth) {
      this.damageFService.getAllIncidence().subscribe(data => {
        this.damages = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          };
        });
      });
     }

  ngOnInit() {
  }

  logOut() {
    this.afAuth.auth.signOut().then(auth => {
      this.router.navigate(['/login']);
    });
  }

  goDamage(inc) {
    const navigationExtras: NavigationExtras = {
      state: {
        incidence: inc
      }
    };

    this.router.navigate(['/damage-details'], navigationExtras);
  }

  deleteDamage(inc) {
    this.damageFService.deleteIncidence(inc.id);
  }

  goUsers() {
    this.router.navigate(['/users']);
  }

  goBudget(inc) {
    const navigationExtras: NavigationExtras = {
      state: {
        incidence: inc
      }
    };
    this.router.navigate(['/budget'], navigationExtras);
  }

  goAbout() {
    this.router.navigate(['/about']);
  }
}
