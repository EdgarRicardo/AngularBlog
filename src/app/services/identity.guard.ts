import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class IdentityGuard implements CanActivate {
  constructor(
    private _userService: UserService,
    private _router: Router
  ){}
  canActivate(){
    /*this._userService.tokenValidation(token).subscribe(
      response => {
        return true;
      },
      er => {
        this._router.navigate['/error'];
        console.log(<any>er);
      }
    );*/
    if(this._userService.getInfoUser()) return true;
    else {
      console.log("User is not logged");
      return this._router.parseUrl('/error');
    }
  }
}
