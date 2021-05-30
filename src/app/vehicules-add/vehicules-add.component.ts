import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vehicules-add',
  templateUrl: './vehicules-add.component.html',
  styleUrls: ['./vehicules-add.component.css']
})
export class VehiculesAddComponent implements OnInit {

  /*
  Image
 Matricule
 Nom de chauffeur
 Statues(en panne, active)
 Date d’ajout*/



newVehicule = new FormGroup({
  matricule: new FormControl('',Validators.required),
  chauffeur: new FormControl('',Validators.required),
  status: new FormControl('',Validators.required),
  dateJoin: new FormControl('',Validators.required),
  
})

chauffeures = [];



title = "cloudsSorage";
selectedFile: File = null;
fb;
downloadURL: Observable<string>;


constructor(private db:AngularFirestore, private router:Router, private storage: AngularFireStorage) { }

ngOnInit(): void {
  this.getLines();
}

getLines(){
  this.db.collection('employees').get().subscribe((data)=>{
    data.docs.forEach(doc => {
      this.chauffeures.push(doc.data());
    });
  })
}


create(){
  this.db.collection('vehicules').add(this.newVehicule.value).then((data)=>{
    this.router.navigate(['/home/vehicules']);
  })
}


}
