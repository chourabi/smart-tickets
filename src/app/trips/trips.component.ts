import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  trips = [];

  constructor(private db:AngularFirestore) { }

  ngOnInit(): void {

    this.db.collection('triptogo').valueChanges().subscribe((data)=>{
      console.log(data);
      
      this.trips = data;
    })
  }


}
