import { Component, OnInit } from '@angular/core';
import { DonanteFront, EmpresaFront, Direccion, Provincia, Poblacion, ComunidadAutonoma } from 'src/app/shared/models';


@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {

  titulo: string = 'Crear cuenta';
  tipoCuentas: string[] = ['Donante', 'Empresa'];
  tipoCuenta: string = '';
  donante: DonanteFront = new DonanteFront();
  empresa: EmpresaFront = new EmpresaFront();
  direccion: Direccion = new Direccion();
  provincia: Provincia = new Provincia();
  población: Poblacion = new Poblacion();
  comunidadAutonoma: ComunidadAutonoma = new ComunidadAutonoma();

  constructor() { }

  ngOnInit(): void {
  }

}
