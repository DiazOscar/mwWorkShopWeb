import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: AngularFirestore) {
  }

  getAllUser() {
    return this.firestore.collection('users').snapshotChanges();
  }
  
  getUser(user){
    return this.firestore.collection('users').doc(user.mail).snapshotChanges();
  }

  createUser(user){
    return this.firestore.collection('users').doc(user.mail).set(user);
  }

  updateUser(user){
    return this.firestore.collection('users').doc(user.mail).update(user);
  }

  deleteUser(userid: string){
    this.firestore.doc('users/' + userid).delete();
  }
}
