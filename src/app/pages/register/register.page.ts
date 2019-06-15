import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: any = '';
  password: any = '';
  cpassword: any = '';
  mail: any = '';
  rol: any = '';

  constructor(public afAuth: AngularFireAuth, private userService: UsersService, public toastCtrl: ToastService,
              private router: Router) { }

  ngOnInit() {}

  async register() {
    if (this.user != '' && this.rol != '' && this.mail != '' && this.password != '' && this.cpassword != '') {
      const {mail, password, cpassword} = this;

      const profile = {
        user : this.user,
        rol : this.rol,
        mail : this.mail
      };

      if (password !== cpassword) {
        this.toastCtrl.toast('Las contraseñas no coinciden');
      }

      try {

        const res = await this.afAuth.auth.createUserWithEmailAndPassword(mail, password);
        this.userService.createUser(profile);
        this.router.navigate(['/users']);

      } catch (err) {

        if (err.code === 'auth/email-already-in-use') {
          this.toastCtrl.toast('El usuario se encuentra registrado, revise los campos');
        } else if (err.code === 'auth/invalid-email') {
          this.toastCtrl.toast('Correo electrónico invalido');
        } else if (err.code === 'auth/weak-password') {
          this.toastCtrl.toast('La contraseña debe de tener 6 caracteres');
        }
      }
    } else {
      this.toastCtrl.toast('Todos los campos deben estar rellenos');
    }
  }

  back() {
    this.router.navigate(['/users']);
  }

}
