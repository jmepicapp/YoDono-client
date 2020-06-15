import { Injectable } from '@angular/core';
import { AppSettings } from '../requests';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Donante, DonanteFront } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class DonanteService {
  
  url = AppSettings.URL_ENDPOINT + '/donantes';

  constructor(private http: HttpClient) {}

  getDonante(id: number): Observable<Donante>{
    return this.http.get<Donante>(this.url + '/' + id).pipe(
      catchError(error => {
        Swal.fire('Error al cargar datos de usuario', error.error.mensaje, 'error');
        return throwError(error);
      })
    );
  }

  getDonanteByEmail(email: string): Observable<Donante>{
    return this.http.get<Donante>(this.url + '/email/' + email).pipe(
      catchError(error => {
        Swal.fire('Error al cargar datos de usuario', error.error.mensaje, 'error');
        return throwError(error);
      })
    );
  }

  create(donante: DonanteFront): Observable<DonanteFront>{
    return this.http.post<DonanteFront>(this.url, donante).pipe(
      catchError( error => {
        Swal.fire('Error al crear', error.error.mensaje, 'error');
        return throwError(error);
      })
    );
  }

  update(donante: Donante): Observable<Donante>{
    return this.http.put<Donante>(this.url, donante).pipe(
      map( (response: any) => response.centro as Donante),
      catchError(e => {
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Donante>{
    return this.http.delete<Donante>(this.url + '/' + id).pipe(
      catchError(e => {
        Swal.fire('Error al eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
