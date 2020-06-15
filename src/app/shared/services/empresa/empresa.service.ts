import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../requests';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Empresa, EmpresaFront } from '../../models';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  url = AppSettings.URL_ENDPOINT + '/empresas';
  
  constructor(
    private http: HttpClient
    ) {}

  getEmpresas(page: number): Observable<any>{
    return this.http.get(this.url + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Empresa[]);
        return response;
      }),
      catchError(error => {
        Swal.fire('Inicia sesión', 'Iniciar sesión para empezar con las donaciones', 'warning');
        return throwError(error);
            })
      );
  }

  getEmpresasByPoblacion(poblacion: string, page: number): Observable<any>{
    return this.http.get(`${this.url}/${poblacion}/page/${page}`).pipe(
      map((response: any) => {
        (response.content as Empresa[]);
        return response;
      }),
      catchError(error => {
        Swal.fire('Inicia sesión', 'Iniciar sesión para empezar con las donaciones', 'warning');
        return throwError(error);
            })
      );
  }

  getEmpresa(id: number): Observable<Empresa>{
    return this.http.get<Empresa>(this.url + '/' + id).pipe(
      catchError(error => {
        Swal.fire('Error al cargar datos de usuario', error.error.mensaje, 'error');
        return throwError(error);
            })
    );
  }

  getEmpresaByEmail(email: string): Observable<Empresa>{
    return this.http.get<Empresa>(this.url + '/email/' + email).pipe(
      catchError(error => {
        Swal.fire('Error al cargar datos de usuario', error.error.mensaje, 'error');
        return throwError(error);
            })
    );
  }

  create(empresa: EmpresaFront): Observable<EmpresaFront>{
    return this.http.post<EmpresaFront>(this.url, empresa).pipe(
      catchError( error => {
        Swal.fire('Error al crear', error.error.mensaje, 'error');
        return throwError(error);
      })
    );
  }

  update(empresa: Empresa): Observable<Empresa>{
    return this.http.put<Empresa>(this.url, empresa).pipe(
      map( (response: any) => response as Empresa),
      catchError(error => {
        Swal.fire('Error al editar', error.error.mensaje, 'error');
        return throwError(error);
      })
    );
  }

  delete(id: number): Observable<Empresa>{
    return this.http.delete<Empresa>(this.url + '/' + id).pipe(
      catchError(error => {
        Swal.fire('Error al eliminar', error.error.mensaje, 'error');
        return throwError(error);
      })
    );
  }
}
