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
    return this.firestore.collection('users').doc(user.user).snapshotChanges();
  }

  createUser(user){
    return this.firestore.collection('users').doc(user.user).set(user);
  }

  updateUser(user){
    return this.firestore.collection('users').doc(user.user).update(user);
  }

  deleteUser(userid: string){
    this.firestore.doc('users/' + userid).delete();
  }
}
