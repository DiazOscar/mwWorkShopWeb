import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mail: string = '';
  password: string = '';

  constructor(public afAuth: AngularFireAuth, private navCtrl: NavController, public toastCtrl: ToastService) { }

  ngOnInit() {
  }

  async login() {
    const { mail, password } = this;
    try {
      return new Promise((resolve, rejected) => {

        this.afAuth.auth.signInWithEmailAndPassword(mail, password).then(user => {
          resolve(user);
          this.navCtrl.navigateForward(['/menu']);
        }).catch(async err => {

          this.toastCtrl.toast('La contraseña no es válida o el usuario no está registrado');
        }
        );
      });
    } catch (err) {

    }
  }
}

