import { Injectable } from '@angular/core';
import { AppSettings } from '../requests';
import { HttpClient } from '@angular/common/http';
import { Donacion } from '../../models';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DonacionService {

  url = AppSettings.URL_ENDPOINT + '/donacion';

  constructor(
    private http: HttpClient
  ) { }

  getDonacionesByDonante(idDonante: number, page: number): Observable<any>{
    return this.http.get(`${this.url}/donante/${idDonante}/page/${page}`).pipe(
      map((response: any) => {
        (response.content as Donacion[]);
        return response;
      }),
      catchError(error => {
        Swal.fire('Inicia sesión', 'Iniciar sesión para empezar con las donaciones', 'warning');
        return throwError(error);
            })
      );
  }

  getDonacionesByEmpresa(idEmpresa: number, page: number): Observable<any>{
    return this.http.get(`${this.url}/empresa/${idEmpresa}/page/${page}`).pipe(
      map((response: any) => {
        (response.content as Donacion[]);
        return response;
      }),
      catchError(error => {
        Swal.fire('Inicia sesión', 'Iniciar sesión para empezar con las donaciones', 'warning');
        return throwError(error);
            })
      );
  }

  

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

  update(donacion: Donacion): Observable<Donacion>{
    return this.http.put<Donacion>(this.url, donacion).pipe(
      catchError(e => {
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  delete(id:number): Observable<Donacion>{
    return this.http.delete<Donacion>(this.url + '/' + id).pipe(
      catchError(e => {
        Swal.fire('Error al eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

}
