import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: string = "";
  password: string = "";
  cpassword: string = "";
  mail: string = "";
  rol: string = "";

  constructor(public afAuth: AngularFireAuth,
    private userService: UsersService,
    public toastCtrl: ToastController, 
    private router: Router) { }

  ngOnInit() {
  }

  async register(){
    if(this.user != "" && this.rol != "" && this.mail != "" && this.password != "" && this.cpassword != ""){ 
      const {mail, password, cpassword} = this
      
      let profile = {
        user : this.user,
        rol : this.rol,
        mail : this.mail
      }
  
      console.log(profile);
      if(password !== cpassword){
        const toast = await this.toastCtrl.create({
          message: "Las contraseñas no coinciden",
          color: "light",
          duration: 2000,
          mode: "ios",
          cssClass: "toastcss",
        });

        toast.present();
        return console.log("password don't match");
      }
      
      try{        
        const res = await this.afAuth.auth.createUserWithEmailAndPassword(mail, password);
        this.userService.createUser(profile);
        this.router.navigate(["/users"]);
      }catch(err){
        console.log(err);
        const toast = await this.toastCtrl.create({
          message: err+"",
          color: "light",
          duration: 2000,
          mode: "ios",
          cssClass: "toastcss",
        });

        toast.present();
      }
    }else{
      const toast = await this.toastCtrl.create({
        message: "Todos los campos deben estar rellenos",
        color: "light",
        duration: 2000,
        mode: "ios",
        cssClass: "toastcss",
      });

      toast.present();
      return console.log("password don't match");
    }
    
  }

  back(){
    this.router.navigate(["/users"]);
  }

}
