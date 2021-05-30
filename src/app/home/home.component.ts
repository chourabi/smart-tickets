import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  projects = [];
  displayName = "chargement..."
  userId;

  constructor(private db:AngularFirestore, private auth:AngularFireAuth,private authS:AuthService) { }

  ngOnInit(): void {
    this.getProjects();
    this.getUserState();
  }

  getUserInfo(){
    this.db.collection('users').doc(this.userId).get().subscribe((data)=>{
      console.log(data.data());
      
      this.displayName = data.data().name;
    })
  }

  getUserState(){
    this.auth.authState.subscribe((user)=>{
      console.log(user);
      
      
      if (user != null) {
        this.userId = user.uid;
        this.getUserInfo();
      }
        
      
      
    })

    
  }

  getProjects(){
    this.projects = [];
    this.db.collection('projects').get().subscribe((data)=>{
      data.docs.forEach(doc => {
        this.projects.push(
          {
            project:doc.data(),
            id:doc.id
          }
        );
      });
      
    })
  }

  logout(){
    if (confirm("Voulez-vous vraiment vous déconnecter?")) {
      this.authS.logOut();
    }
  }

}
