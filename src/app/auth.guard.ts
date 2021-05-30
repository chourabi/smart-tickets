import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AngularFireAuth,private router:Router){

  }

  public get isLogged() : boolean {
    let token=window.localStorage.getItem('idConnectedUser');
    if (token!==null) {
      return true;
    } else {
      return false; 
    }
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      
        if (this.isLogged ) {
          return true;
        } else {
          this.router.navigate(['/rns-login']);
          return false;
        }


      
      


      
      
      
    
  }
  
}
