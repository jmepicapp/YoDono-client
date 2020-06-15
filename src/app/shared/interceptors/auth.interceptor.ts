import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error.status === 401) {
          if (this.authService.isAuthenticated()) {
            this.authService.logout();
            Swal.fire({
              icon: 'warning',
              title: 'Inicie sesión nuevamente',
            });
          }
          this.router.navigate(['/home']);
        }
        if (error.status === 403) {
          Swal.fire({
            icon: 'warning',
            title: 'Acceso denegado',
          });
          this.router.navigate(['/home']);
        }
        return throwError(error);
      })
    );
  }
}
