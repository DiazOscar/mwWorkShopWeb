import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators'
import { isNullOrUndefined } from 'util';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate  {

  constructor(private AFAuth: AngularFireAuth, private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.AFAuth.authState.pipe(map(auth => {
      if(isNullOrUndefined(auth)){        
        return true;
      }
      else{
        this.router.navigate(['/menu']) 
        return false;
      } 
    
    }))
  }
  
}
