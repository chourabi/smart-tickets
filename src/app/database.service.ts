import { Injectable } from '@angular/core';
import { FirebaseFirestore } from '@angular/fire';
import { Observable, Observer } from 'rxjs';
import { AngularFirestore, DocumentChangeAction, DocumentReference, QuerySnapshot, DocumentData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore:AngularFirestore) { 
    
  }


  getInvections(): Observable<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>{
      return this.firestore.collection('infections',ref=>ref.orderBy('addDate','desc') ).get();
  }


}
