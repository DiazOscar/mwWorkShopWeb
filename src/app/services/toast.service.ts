import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController) { }

  async toast(message: any) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: 'light',
      duration: 2000,
      mode: 'ios',
      cssClass: 'toastcss',
    });

    toast.present();
  }
}
