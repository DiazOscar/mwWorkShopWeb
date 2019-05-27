import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'

@Injectable({
  providedIn: 'root'
})
export class DamagesService {


  constructor(private firestore: AngularFirestore) {
  }

  getAllIncidence() {
    return this.firestore.collection('damagesF').snapshotChanges();
  }
  
  getIncidence(incidence){
    return this.firestore.collection('damagesF').doc(incidence.id).snapshotChanges();
  }

  createIncidence(incidence){
    return this.firestore.collection('damagesF').doc(incidence.id).set(incidence);
  }

  updateIncidence(incidence){
    return this.firestore.collection('damagesF').doc(incidence.idInc).update(incidence);
  }

  deleteIncidence(incidenceId: string){
    this.firestore.doc('damagesF/' + incidenceId).delete();
  }
}
