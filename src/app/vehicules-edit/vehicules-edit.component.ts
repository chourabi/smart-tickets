import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, finalize } from "rxjs/operators";

@Component({
  selector: 'app-vehicules-edit',
  templateUrl: './vehicules-edit.component.html',
  styleUrls: ['./vehicules-edit.component.css']
})
export class VehiculesEditComponent implements OnInit {


  newVehicule = new FormGroup({
    matricule: new FormControl('',Validators.required),
    chauffeur: new FormControl('',Validators.required),
    status: new FormControl('',Validators.required),
    dateJoin: new FormControl('',Validators.required),
    
  })

  vehicule = null;
  
  chauffeures = [];
  
  
  
  title = "cloudsSorage";
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  carId;


  uploadStatus="";
  
  constructor(private db:AngularFirestore, private router:Router, private storage: AngularFireStorage, private route:ActivatedRoute) { }
  
  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.carId = id;
    this.getLines();

    this.getVehiculeData();
  }

  
  getVehiculeData(){
    this.db.collection('vehicules').doc(this.carId).get().subscribe((data)=>{
      this.vehicule = data.data();
     
       var formData = data.data();

       
       delete formData.id;
       delete formData.photoURL;
       
       this.newVehicule.setValue(formData);
   })

  }

  
  
  getLines(){
    this.db.collection('employees').get().subscribe((data)=>{
      data.docs.forEach(doc => {
        this.chauffeures.push(doc.data());
      });
    })
  }
  
  
  updateVehicule(){
    this.db.collection('vehicules').doc(this.carId).update(this.newVehicule.value).then((data)=>{
      this.router.navigate(['/home/vehicules']);
    })
  }
  


  onFileSelected(event) {
    this.uploadStatus = "Chargement...";
     var n = Date.now();
     const file = event.target.files[0];
     const filePath = `vehicules/${n}`;
     const fileRef = this.storage.ref(filePath);
     const task = this.storage.upload(`vehicules/${n}`, file);
     task
       .snapshotChanges()
       .pipe(
         finalize(() => {
           this.downloadURL = fileRef.getDownloadURL();
           this.downloadURL.subscribe(url => {
             if (url) {
               this.fb = url;
             }

             this.uploadStatus="Photo est a jour !";
             this.db.collection('vehicules').doc(this.carId).update({photoURL:this.fb}).then((data)=>{this.getVehiculeData()})
 
             
           });
         })
       )
       .subscribe(url => {
         if (url) {
           console.log(url);
         }
       });
   }


}
