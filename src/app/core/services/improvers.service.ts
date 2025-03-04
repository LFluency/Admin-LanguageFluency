import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class ImproversService {
  improvers = [];
  constructor(
    public afstore: AngularFirestore
  ) { }

  async getInprovers() {
    await this.afstore.collection('perfiles', ref => ref.where('role', '==', 'cliente')).snapshotChanges()
    .subscribe( data => {
      this.improvers = data.map( result => {
        return {
          // userId: result.payload.doc.id,
          userName: result.payload.doc.data()['name'],
          userLastName: result.payload.doc.data()['lastName']
        }
      } )
    })
  }

  getImprover(id: string) {
    return this.afstore.collection('perfiles').doc(id).snapshotChanges();
  }

  getCalls(id: string) {
    return this.afstore.collection('calls', ref => ref.where('inmpId','==', id)).snapshotChanges();
  }
}
