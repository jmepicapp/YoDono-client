import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class RolGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isAuthenticated) {
      if(this.isTokenExpired()){
        this.authService.logout();
        this.router.navigate(['/login']);
        return false;
      } 
    }
    let rol = next.data['rol'] as string;
    if (this.authService.hasRole(rol)) {
      return true;
    }
    Swal.fire({
      icon: 'warning',
      title: 'Acceso denegado',
      text: 'No posees permisos suficientes',
    });
    this.router.navigate(['/empresas']);
    return false;
  }
   
  isTokenExpired(): boolean{
    let token = this.authService.token;
    let payload = this.authService.decryptToken(token);
    let now = new Date().getTime() / 1000;

    if(payload.exp < now){
      return true;
    }
    return false;
  }
}
