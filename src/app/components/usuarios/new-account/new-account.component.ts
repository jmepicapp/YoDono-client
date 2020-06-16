import { Component, OnInit } from '@angular/core';
import { DonanteFront, EmpresaFront, Direccion, Provincia, Poblacion, ComunidadAutonoma, Donante } from 'src/app/shared/models';
import { DonanteService } from 'src/app/shared/services/donante/donante.service';
import { EmpresaService } from 'src/app/shared/services/empresa/empresa.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {

  titulo: string = 'Registrarse';
  tipoCuentas: string[] = ['Donante', 'Empresa'];
  tipoCuenta: string = '';
  donante: DonanteFront = new DonanteFront();
  empresa: EmpresaFront = new EmpresaFront();

  constructor(
    private donanteService: DonanteService,
    private empresaService: EmpresaService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  newUser(){
    if(this.tipoCuenta === 'Donante'){
      this.newDonante();
    }else if(this.tipoCuenta === 'Empresa'){
      this.newEmpresa();
    }
  }

  newDonante(): void {
    console.log(this.donante);
    this.donanteService.create(this.donante).subscribe(
      donante => {
        this.router.navigate(['/home']);
        Swal.fire('Usuario creado', 'Inicia sesión para comenzar a hacer donaciones', 'success');
      }
    )
  }

  newEmpresa(): void {
    this.empresaService.create(this.empresa).subscribe(
      donante => {
        this.router.navigate(['/home']);
        Swal.fire('Usuario creado', 'Inicia sesión para comenzar a recibir donaciones', 'success');
      }
    );
  }

}
