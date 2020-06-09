import { Injectable } from '@angular/core';
import { AppSettings } from '../requests';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Donante } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class DonanteService {
  
  url = AppSettings.URL_ENDPOINT + '/donantes';

  constructor(private http: HttpClient) {}

  getEmpresas(page: number): Observable<any>{
    return this.http.get(this.url + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Donante[]);
        return response;
      })
      );
  }
  create(donante: Donante): Observable<Donante>{
    return this.http.post<Donante>(this.url, donante).pipe(
      catchError( e => {
        Swal.fire('Error al crear', e.error, 'error');
        return throwError(e);
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
    return this.http.delete<Donante>(this.url).pipe(
      catchError(e => {
        Swal.fire('Error al eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
