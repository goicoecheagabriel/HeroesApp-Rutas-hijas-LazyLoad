import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor( private authService: AuthService,
               private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      /* if ( this.authService.auth.id ) {
        return true;
      }

      console.log('Bloquedado por el AuthGuard - canActivate')
    return false; */
    return this.authService.verificaAutentificacion()
              .pipe(
                tap( estaAutenticado => {
                  if ( !estaAutenticado ){
                    this.router.navigate(['./auth/lgin'])
                  }
                } )
              );

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verificaAutentificacion()
              .pipe(
                tap( estaAutenticado => {
                  if ( !estaAutenticado ){
                    this.router.navigate(['./auth/lgin'])
                  }
                } )
              );


      /* if ( this.authService.auth.id ) {
        return true;
      }

      console.log('Bloquedado por el AuthGuard - canLoad')
    return false; */
  }
}
