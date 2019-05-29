import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth"
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mail: string = "";
  password: string = "";

  constructor(public afAuth: AngularFireAuth, private navCtrl: NavController, public toastCtrl: ToastController) { }

  ngOnInit() {
  }

  async login(){
    const { mail, password } = this
    try{
      return new Promise((resolve, rejected) => {
        console.log(mail);
        this.afAuth.auth.signInWithEmailAndPassword(mail, password).then(user=>{
                resolve(user)
                this.navCtrl.navigateForward(['/menu']);
              }).catch(err => rejected(err))
      });  
    }catch(err){
      console.dir(err);
      const toast = await this.toastCtrl.create({
        message: err + "sorry",
        duration: 2000
      });

      toast.present();
    }
  }
}

