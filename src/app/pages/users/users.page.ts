import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users = [];
  
  constructor(private userService: UsersService,
    private router: Router,
    public alertCtrl: AlertController,
    public afAuth: AngularFireAuth) { }
  
  ngOnInit() {
    this.userService.getAllUser().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      })
    });

    console.log(this.users);
  }

  goRegister(){
    this.router.navigate(['/register']);
  }

  async delete(user){
    console.log(user);
    const input = await this.alertCtrl.create({
      header: 'Eliminar usuario',
      subHeader: 'Introduce contraseña del usuario',
      inputs: 
      [
        {
          name: 'txtPassword',
          type: 'text',
          placeholder: 'Contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Eliminar',
          handler: async (data) => {
            console.log('Confirm Okay', data.txtPassword);
            console.log(this.afAuth);
            this.userService.deleteUser(user.user);
            this.afAuth.auth.signInWithEmailAndPassword(user.mail, data.txtPassword)
            .then(function (user) {
            
              user.user.delete();
            });
          }
        }
      ]
    });

    await input.present();
  }

  back(){
    this.router.navigate(["/menu"]);
  }
  

}
