import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../requests';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Empresa } from '../../models';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  url = AppSettings.URL_ENDPOINT + '/empresas';
  headers = AppSettings.HEADERS;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
    ) {}

  getEmpresas(page: number): Observable<any>{
    return this.http.get(this.url + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Empresa[]);
        return response;
      })
      );
  }
  create(empresa: Empresa): Observable<Empresa>{
    return this.http.post<Empresa>(this.url, empresa).pipe(
      catchError( error => {
        Swal.fire('Error al crear', error.error, 'error');
        return throwError(error);
      })
    );
  }

  update(empresa: Empresa): Observable<Empresa>{
    return this.http.put<Empresa>(this.url, empresa).pipe(
      map( (response: any) => response.centro as Empresa),
      catchError(error => {
        Swal.fire('Error al editar', error.error.mensaje, 'error');
        return throwError(error);
      })
    );
  }

  delete(id: number): Observable<Empresa>{
    return this.http.delete<Empresa>(this.url).pipe(
      catchError(error => {
        Swal.fire('Error al eliminar', error.error.mensaje, 'error');
        return throwError(error);
      })
    );
  }
  
}
