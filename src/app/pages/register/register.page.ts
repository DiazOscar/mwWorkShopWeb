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
    const {mail, password, cpassword} = this
    
    let profile = {
      user : this.user,
      rol : this.rol,
      mail : this.mail
    }

    console.log(profile);
    if(password !== cpassword){
      return console.log("password don't match");
    }
    
    try{
      this.userService.createUser(profile);
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(mail, password);

      this.router.navigate(["/users"]);
    }catch(err){
      console.log(err);
    }
    
  }

}
