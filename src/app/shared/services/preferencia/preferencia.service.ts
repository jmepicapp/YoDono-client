import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../requests';

@Injectable({
  providedIn: 'root'
})
export class PreferenciaService {

  url = AppSettings.URL_ENDPOINT + '/preferencias';

  constructor(private http: HttpClient) {}

}
