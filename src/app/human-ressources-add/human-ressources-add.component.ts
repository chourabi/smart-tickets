import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, finalize } from "rxjs/operators";

@Component({
  selector: 'app-human-ressources-add',
  templateUrl: './human-ressources-add.component.html',
  styleUrls: ['./human-ressources-add.component.css']
})
export class HumanRessourcesAddComponent implements OnInit {


  newEmployee = new FormGroup({
    fullname: new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required),
    vehiculeMatricule: new FormControl(''),
    line: new FormControl('',Validators.required),
    working_hour: new FormControl('',Validators.required),
    status: new FormControl('',Validators.required),
    dateJoin: new FormControl('',Validators.required),
    
  })

  lines = [];



  title = "cloudsSorage";
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
 

  constructor(private db:AngularFirestore, private router:Router, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getLines();
  }

  getLines(){
    this.db.collection('trajets').get().subscribe((data)=>{
      data.docs.forEach(doc => {
        this.lines.push(doc.data());
      });
    })
  }


  create(){
    this.db.collection('employees').add(this.newEmployee.value).then((data)=>{
      this.router.navigate(['/home/rh']);
    })
  }



}
