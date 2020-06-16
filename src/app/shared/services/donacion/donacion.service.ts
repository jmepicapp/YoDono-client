import { Injectable } from '@angular/core';
import { AppSettings } from '../requests';
import { HttpClient } from '@angular/common/http';
import { Donacion } from '../../models';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DonacionService {

  url = AppSettings.URL_ENDPOINT + '/donacion';

  constructor(
    private http: HttpClient
  ) { }

  getDonacion(id: number): Observable<Donacion>{
    return this.http.get<Donacion>(this.url + '/' + id).pipe(
      catchError(error => {
        Swal.fire('Error al cargar datos de usuario', error.error.mensaje, 'error');
        return throwError(error);
          })
    );
  }

  createDonacion(donacion: Donacion): Observable<Donacion>{
    return this.http.post<Donacion>(this.url, donacion).pipe(
      catchError( error => {
        console.log(error);
        Swal.fire('Error al crear', error.error.mensaje, 'error');
        return throwError(error);
      })
    );
  }
}
