import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresaService } from 'src/app/shared/services/empresa/empresa.service';
import { Empresa, Donante, Usuario, Donacion } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DonanteService } from 'src/app/shared/services/donante/donante.service';
import { DonacionService } from 'src/app/shared/services/donacion/donacion.service';

@Component({
  selector: 'app-solicitud-donacion',
  templateUrl: './solicitud-donacion.component.html',
  styleUrls: ['./solicitud-donacion.component.css'],
})
export class SolicitudDonacionComponent implements OnInit {
  placeholder =
    'Escribe aquí lo que quieres donar indicando el máximo de detalles posibles como el tipo de producto o la cantidad.';
  empresa: Empresa = new Empresa();
  donante: Donante = new Donante();
  donacion: Donacion = new Donacion();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private empresaService: EmpresaService,
    private donanteService: DonanteService,
    private donacionService: DonacionService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.empresaService
          .getEmpresa(id)
          .subscribe((empresa) => (this.empresa = empresa));
      }
    });
    this.getDonante();
  }

  getDonante(): void {
    let usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
    this.donanteService.getDonanteByEmail(usuario.email).subscribe(response => {
      this.donante = response as Donante;
    });
  }

  send(){
    this.donacion.empresa = this.empresa;
    this.donacion.donante = this.donante;
    console.log(this.donacion);
    this.donacionService.createDonacion(this.donacion).subscribe(response => {
      console.log(response);
      this.router.navigate[('/solicitud-donacion/' + response.id)];
    });
  }
}
