import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth : AngularFireAuth,private firesotre : AngularFirestore) {


  }

  
  public get isLogged() : boolean {
    let token=window.localStorage.getItem('idConnectedUser');
    if (token!==null) {
      return true;
    } else {
      return false; 
    }
  }
  
  public   logUser(email:string,password:string) : Promise<firebase.auth.UserCredential> {
      return  this.auth.auth.signInWithEmailAndPassword(email,password);
    
  }

  public   createAccount(email:string,password:string) : Promise<firebase.auth.UserCredential> {
    return  this.auth.auth.createUserWithEmailAndPassword(email,password);
  
}


  public logOut(){
    this.auth.auth.signOut().then(()=>{
      window.localStorage.removeItem('idConnectedUser');
      window.localStorage.removeItem('idCompany');

    })
  }
}
