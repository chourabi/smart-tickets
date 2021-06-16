import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HumanRessourcesAddComponent } from './human-ressources-add/human-ressources-add.component';
import { HumanRessourcesDetailsComponent } from './human-ressources-details/human-ressources-details.component';
import { HumanRessourcesComponent } from './human-ressources/human-ressources.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { TripsAddComponent } from './trips-add/trips-add.component';
import { TripsComponent } from './trips/trips.component';
import { VehiculesAddComponent } from './vehicules-add/vehicules-add.component';
import { VehiculesEditComponent } from './vehicules-edit/vehicules-edit.component';
import { VehiculesComponent } from './vehicules/vehicules.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  { path:'' , redirectTo:'/home/welcome', pathMatch:'full' },

  { path:'home' , component:HomeComponent, children:[
    { path:'welcome', component:TripsComponent },
    { path:'trips', component:TripsComponent },
    { path:'trips-add', component:TripsAddComponent },
    
    

    // rh
    { path:'rh', component:HumanRessourcesComponent },
    { path:'rh-add', component:HumanRessourcesAddComponent },
    { path:'rh-edit/:id', component:HumanRessourcesDetailsComponent },

    // vehicules
    { path:'vehicules', component:VehiculesComponent },
    { path:'vehicules-add', component:VehiculesAddComponent },
    { path:'vehicules-edit/:id', component:VehiculesEditComponent },
    
    


    
  ] },
  
  { path:'signin' , component:SigninComponent },
  { path:'signup' , component:SignupComponent },


  { path:'**' , redirectTo:'/' },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
