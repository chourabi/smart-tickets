import { Component, OnInit } from '@angular/core';
import { FirebaseAuth } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tourofchamps';


  constructor(private router:Router, private auth :AngularFireAuth, private route:ActivatedRoute){

  }

  ngOnInit(): void {
    this.auth.authState.subscribe((user)=>{
      console.log(user);
      
      
      if (user == null) {
        this.router.navigate(['/signin']);
        
      }
        
      
      
    })
    
  }


}
