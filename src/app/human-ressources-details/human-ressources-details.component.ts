import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, finalize } from "rxjs/operators";

@Component({
  selector: 'app-human-ressources-details',
  templateUrl: './human-ressources-details.component.html',
  styleUrls: ['./human-ressources-details.component.css']
})
export class HumanRessourcesDetailsComponent implements OnInit {
  id;
  employee = null;
  title = "cloudsSorage";
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;

  uploadStatus="";

  lines = [];
 
  newEmployee = new FormGroup({
    fullname: new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required),
    vehiculeMatricule: new FormControl(''),
    line: new FormControl('',Validators.required),
    working_hour: new FormControl('',Validators.required),
    status: new FormControl('',Validators.required),
    dateJoin: new FormControl('',Validators.required),
    
  })

  constructor(private route:ActivatedRoute, private db:AngularFirestore, private router:Router, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    
    

    this.getLines();
  }

 

  getLines(){
    this.db.collection('trajets').get().subscribe((data)=>{
      data.docs.forEach(doc => {
        this.lines.push(doc.data());
      });

      this.getEmployeeDetails();
      
    })
  }


  getEmployeeDetails(){
    
    this.db.collection('employees').doc(this.id).get().subscribe((data)=>{
       this.employee = data.data();
      
        var formData = data.data();

        
        delete formData.id;
        delete formData.photoURL;
        
        this.newEmployee.setValue(this.employee)
    })



  }

  updateEmployee(){
    this.db.collection('employees').doc(this.id).update(this.newEmployee.value).then((data)=>{
      this.router.navigate(['/home/rh']);
    })
  }

  onFileSelected(event) {
    this.uploadStatus = "Chargement...";
     var n = Date.now();
     const file = event.target.files[0];
     const filePath = `employees/${n}`;
     const fileRef = this.storage.ref(filePath);
     const task = this.storage.upload(`employees/${n}`, file);
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
             this.db.collection('employees').doc(this.id).update({photoURL:this.fb}).then((data)=>{this.getEmployeeDetails()})
 
             
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
