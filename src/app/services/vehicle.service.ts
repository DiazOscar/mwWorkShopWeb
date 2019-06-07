import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private firestore: AngularFirestore) {   }

  getAllVehicle() {
    return this.firestore.collection('vehicles').snapshotChanges();
  }

  getVehicle(enrollment){
    return this.firestore.collection('vehicles').doc(enrollment).snapshotChanges();
  }

  createVehicle(vehicle: any){
    vehicle.year = vehicle.year.substring(0, 4);
    return this.firestore.collection('vehicles').doc(vehicle.enrollment).set(vehicle);
  }

  updateVehicle(vehicle: any){
    vehicle.year = vehicle.year.substring(0, 4);
    this.firestore.collection('vehicles').doc(vehicle.enrollment).set(vehicle);
  }
  
}
