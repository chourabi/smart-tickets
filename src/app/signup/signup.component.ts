import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  errMsg='';
  successMsg='';
  signupForm = new FormGroup({
    name : new FormControl('',Validators.required),
    email : new FormControl('',Validators.email),
    password : new FormControl('',Validators.required),
    
    
  })


  constructor(private auth:AuthService,private db:AngularFirestore,private router:Router) { }

  ngOnInit(): void {
  }




  signupNow(){
    this.errMsg="";
    
    const password = this.signupForm.value.password;
    const name = this.signupForm.value.name;
    const email = this.signupForm.value.email;

    this.auth.createAccount(email,password).then((res)=>{
      this.db.collection("users").doc(res.user.uid).set({
        "email":email,
        "name":name
      }).then((res)=>{
        this.router.navigate(['/home/welcome'])
        
      }).catch((err)=>{
        this.errMsg="Une erreur s'est produite. Veuillez réessayer";
      })
    })

    
    

    
  }
}
