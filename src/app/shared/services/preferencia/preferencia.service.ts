import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../urlEndPoint';

@Injectable({
  providedIn: 'root'
})
export class PreferenciaService {

  url = AppSettings.URL_ENDPOINT + '/preferencias';

  constructor(private http: HttpClient) {}

}
