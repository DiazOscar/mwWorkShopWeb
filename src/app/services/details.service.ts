import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private detailsService: AngularFirestore) { }

  getAllDetails() {
    return this.detailsService.collection('details').snapshotChanges();
  }

  getDetail(id: any){
    return this.detailsService.collection('details').doc(id).snapshotChanges();
  }

  createDetails(details){
    return this.detailsService.collection('details').doc(details.id).set(details);

  }

  updateDetails(details){
    this.detailsService.collection('details').doc(details.id).set(details);
  }

  deleteDetails(detailId: string){
    this.detailsService.doc('details/' + detailId).delete();
  }
}
