import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private firestore: AngularFirestore) {   }

  getAllCustomer() {
    return this.firestore.collection('customers').snapshotChanges();
  }

  getCustomer(nif: any){
    return this.firestore.collection('customers').doc(nif).snapshotChanges();
  }

  createCustomer(customer: any){
    return this.firestore.collection('customers').doc(customer.nif).set(customer);

  }

  updateCustomer(customer: any){
    this.firestore.collection('customers').doc(customer.nif).set(customer);
  }

}
