import { Component, OnInit } from '@angular/core';
import { FirebaseFirestore } from '@angular/fire';
import { DatabaseService } from '../database.service';
import * as mapboxgel from 'mapbox-gl';
import { environment } from '../../environments/environment'
import { GeoJson, FeatureCollection } from '../map';
@Component({
  selector: 'app-map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  lat: number=0;
  lng: number=0;
  infections = new FeatureCollection([]);

  infectionVisualList=[];

  map: mapboxgel.Map;
  source: any;
  searchQuery = "";
  seachInfections = [];

  serverIsFull:boolean=false;

  myPosition:any;

  showLatestBloc:boolean=true;



  constructor(private database: DatabaseService) {
    mapboxgel.accessToken = "pk.eyJ1IjoianJhYmFzYWZhIiwiYSI6ImNrcDMwbGs5OTFyc2gyeG1jNmhyNDhwZXEifQ.OEaNAUlTuN6j4el2qtu85w";

    

    try {
      mapboxgel.setRTLTextPlugin(
        'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
        null,
        true );
    } catch (error) {
      
    }
  }

  ngOnInit(): void {
    this.getUserLocation();


    this.initMap();
    
  }


/*
  getInfections() {
      var j =0;
      this.database.getInvections().subscribe((data) => {
        this.infections.features = [];
        this.infectionVisualList=[];
  
        data.forEach(infection => {
          j++;
          let infectionData = infection.data();
          this.infectionVisualList.push(infectionData);
  
          switch (infectionData.stat) {
            case 0:
              var geoJsonPoint = new GeoJson([infectionData.position.longitude, infectionData.position.latitude],
                {
                  "color": "#03a9f4",
                  "description": "<div><strong>NOUVEAU CAS</strong></div>"
                }
  
              );
              this.infections.features.push(geoJsonPoint);
              break;
  
            case 1:
              var geoJsonPoint = new GeoJson([infectionData.position.longitude, infectionData.position.latitude], {
                "color": "#ffc107",
                "description": "<div><strong>CAS SUSPECTS</strong></div>"
              });
              this.infections.features.push(geoJsonPoint);
              break;
            case 2:
              var geoJsonPoint = new GeoJson([infectionData.position.longitude, infectionData.position.latitude], {
                "color": "#dc3545",
                "description": "<div><strong>CAS CONFIRMÉ</strong></div>"
              });
              this.infections.features.push(geoJsonPoint);
              break;
  
  
  
          }
  
  
        });
        //console.log(this.infections);
        this.source.setData(this.infections);
  
  
      },(error)=>{
        this.serverIsFull=true;
      })

  }*/

  initMap() {
    this.buildMap();


  }


  flyToPosition(position:any){
    this.map.flyTo({
      center: [
        position.longitude ,
        position.latitude
      ],
      essential: true,
      zoom:13
      });

  }

  getMyPosition(){
    
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          this.lat=position.coords.latitude,
          this.lng=position.coords.longitude

          if (this.lat !=0 && this.lng!=0) {
            this.map.flyTo({
              center: [
              this.lng ,
              this.lat 
              ],
              essential: true,
              zoom:13
              });
        
              this.myPosition=new GeoJson([
                this.lng ,
                this.lat 
                ],
                {
                  "text":"je suis ici.",
                  "description":"<strong>je suis ici.</strong>"
                }
                )
              this.map.addSource('myposition', {
                'type': 'geojson',
                'data': this.myPosition
              });
        
              this.map.addLayer({
                'id': 'myposition',
                'type': 'circle',
                'source': 'myposition',
                'paint': {
        
                  'circle-radius': {
                    'base': 50.75,
                    'stops': [[30, 5], [55, 450]]
                  },
                  'circle-color': '#fff'
                }
              });
        
              this.map.on('click', 'myposition', (e) => {
                var coordinates = e.features[0].geometry.coordinates.slice();
                var description = e.features[0].properties.description;
        
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
        
                return new mapboxgel.Popup()
                  .setLngLat(coordinates)
                  .setHTML(description)
                  .addTo(this.map);
              });
          }
          
        },(error)=>{
          alert("Quelque chose s'est mal passé en essayant de vous localiser");
        })
      }else{
        alert("Désolé mais votre appareil ne prend pas en charge cette fonctionnalité.")
      }

  }


  buildMap() {
    this.map = new mapboxgel.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 5,
      center: [9.530273341475947, 34.31351410215606]
    });



    this.map.addControl(new mapboxgel.NavigationControl());


    this.map.on('click', (event) => {
      this.seachInfections=[];

    })

    this.map.on('load', () => {
      this.map.addSource('infections', {
        'type': 'geojson',
        'data': this.infections
      });

      this.map.addLayer({
        'id': 'infections',
        'type': 'circle',
        'source': 'infections',
        'paint': {

          'circle-radius': {
            'base': 50.75,
            'stops': [[40, 10], [60, 460]]
          },
          'circle-color': ['get', 'color']
        }
      });

      this.source = this.map.getSource('infections');
      //now we get the infections
      



      //now we add an on click to a marker to display the person information
      this.map.on('click', 'infections', (e) => {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        return new mapboxgel.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(this.map);
      });
    });



  }

  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      })
    }
  }



}
