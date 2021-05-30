import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {



  isLoading = false;
  showErrorBloc=false;
  errorMessage="";

  loginForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('' , Validators.required),
  });
  constructor(private auth : AuthService,private firestore:AngularFirestore,private router: Router) { 
    
  }

  ngOnInit() {
  }

    loginUser(e){
    this.isLoading=true;
    this.showErrorBloc=false;
    this.errorMessage="";
     this.auth.logUser(this.loginForm.value.email,this.loginForm.value.password).then((dataUser)=>{

      
      this.firestore.collection('campany',ref=>ref.where('headmaster','==',dataUser.user.uid)).get().subscribe(data=>{
        
        if(data.docs.length===0){
          this.showErrorBloc=true;
          this.errorMessage="Invalid Master informations";
        }else{
          window.localStorage.setItem('idConnectedUser',dataUser.user.uid);
          window.localStorage.setItem('idCompany',data.docs[0].data().idcompany);
          
        //routing
        this.router.navigate(['/dashboard']);
        }
        

      })
      
    }).catch((error)=>{
      console.log(error);
      this.showErrorBloc=true;
      switch (error.code) {
        case 'auth/user-not-found':
          this.errorMessage="On dirait que vous uliliser une mauvaise adresse e-mail, nous n'avons aucun utilisateur avec cet e-mail";
          break;
        case 'auth/internal-error':
          this.errorMessage="On dirait que vous uliliser une mauvaise adresse e-mail, nous n'avons aucun utilisateur avec cet e-mail";
        break;
        case 'auth/wrong-password':
          this.errorMessage="Mot de passe incorrect, veuillez réessayer.";
          break;
        case 'value':
          this.errorMessage="Une erreur s'est produite. Veuillez réessayer";
          break;
      
        default:
          break;
      }
      
    }).finally(()=>{
      this.isLoading=false;
    })
    
  }

  /*async login(){
    await this.auth.getUserInformation();
  }*/

}
