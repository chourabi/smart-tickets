import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trips-add',
  templateUrl: './trips-add.component.html',
  styleUrls: ['./trips-add.component.css']
})
export class TripsAddComponent implements OnInit {

  newTrip = new FormGroup({
    id_vehicule : new FormControl('',Validators.required),
    tarif: new FormControl('0',Validators.required),
    trajet: new FormControl('',Validators.required),
    nbrPlace: new FormControl('0',Validators.required),
    
    
  });


  lines = [];
  vehicules = [];


 

  constructor(private db:AngularFirestore, private router:Router) { }

  ngOnInit(): void {
    this.getLines();

    this.getVehicules();

  }

  getLines(){
    this.db.collection('trajets').get().subscribe((data)=>{
      data.docs.forEach(doc => {
        this.lines.push(doc.data());
      });
    })
  }

  getVehicules(){
    this.db.collection('vehicules').get().subscribe((data)=>{
      data.docs.forEach(doc => {
        this.vehicules.push({ id:doc.id, data:doc.data() });
      });
    })
  }




  create(){
    this.db.collection('triptogo').add({
      vehicule : this.newTrip.value.id_vehicule,
      tarif : this.newTrip.value.tarif,
      trajet : this.newTrip.value.trajet,
      nbrPlace : this.newTrip.value.nbrPlace,
      reservedPlases : 0,
      isOpen:true,
      addDate: new Date()

    }).then((res)=>{
      this.router.navigate(['/home/trips']);
    }).catch(()=>{
      alert("Une erreur s'est produite. Veuillez réessayer.");
    })
  }

}
