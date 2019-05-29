import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DamageService {


  damage: any;
  
  constructor() {
    this.damage = {
      id: "",
      car: "",
      date: ""
    }
   }

  
}
