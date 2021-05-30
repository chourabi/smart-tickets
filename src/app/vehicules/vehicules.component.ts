import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-vehicules',
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.css']
})
export class VehiculesComponent implements OnInit {

  vehicules = [];

  constructor(private db:AngularFirestore) { }

  ngOnInit(): void {
    this.getVehicules();

  }


  async getVehicules(){
    this.vehicules = [];
    this.db.collection('vehicules').get().subscribe((data)=>{

      data.docs.forEach(async (doc) => {
        
        this.vehicules.push(
          {
            vehicule:doc.data(),
            id:doc.id
          }
        );

        

        
      });

      console.log(this.vehicules);
      
      
    })
  }

  deleteVehicule(id){
    if (confirm('Voulez-vous vraiment supprimer cet véhicule?')) {
      this.db.collection('vehicules').doc(id).delete().then((data)=>{ this.getVehicules() })
    }
  }

}
