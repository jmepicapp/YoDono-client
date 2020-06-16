import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresaService } from 'src/app/shared/services/empresa/empresa.service';
import { Empresa, Donante, Usuario, Donacion } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DonanteService } from 'src/app/shared/services/donante/donante.service';
import { DonacionService } from 'src/app/shared/services/donacion/donacion.service';
import { catchError, tap } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitud-donacion',
  templateUrl: './solicitud-donacion.component.html',
  styleUrls: ['./solicitud-donacion.component.css'],
})
export class SolicitudDonacionComponent implements OnInit {
  empresa: Empresa = new Empresa();
  donante: Donante = new Donante();
  donacion: Donacion = new Donacion();
  listaDonaciones: Donacion[] = [];
  paginador: any;

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
    if (this.authService.hasRole('ROLE_DONANTE')) {
      this.getDonante();
    } else if (this.authService.hasRole('ROLE_EMPRESA')) {
      this.getEmpresa();
    }
  }

  getDonante(): void {
    let usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
    this.donanteService
      .getDonanteByEmail(usuario.email)
      .subscribe((response) => {
        this.donante = response as Donante;
        this.getDonacionesByDonante();
      });
  }

  getDonacionesByDonante(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }

      this.donacionService
        .getDonacionesByDonante(this.donante.id, page)
        .subscribe((response) => {
          this.listaDonaciones = response.content as Donacion[];
          this.paginador = response;
        });
    });
  }

  getEmpresa(): void {
    let usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
    this.empresaService
      .getEmpresaByEmail(usuario.email)
      .subscribe((response) => {
        this.donante = response as Donante;
        this.getDonacionesByEmpresa();
      });
  }

  getDonacionesByEmpresa(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }

      this.donacionService
        .getDonacionesByEmpresa(this.donante.id, page)
        .subscribe((response) => {
          this.listaDonaciones = response.content as Donacion[];
          console.log(this.listaDonaciones);
          this.paginador = response;
        });
    });
  }

  accept(donacion: Donacion): void {
    donacion.estado = 'ACEPTADO';
    this.donacionService.update(donacion).subscribe((don) => {
      this.router.navigate(['/solicitud-donacion']);
      Swal.fire(
        '¡Genial!',
        'Escríbele a <a href="mailto:' +
          don.donante.usuario.email +
          '?Subject=Tu solicitud de donación ha sido aceptada">' +
          don.donante.usuario.email +
          '</a> para cerrar la donación',
        'success'
      );
    });
  }

  refuse(donacion: Donacion): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mx-2',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title:
          '¿Estás seguro de rechazar la solicitud de donación de ' +
          donacion.donante.nombre +
          '?',
        text: 'Esta acción no tiene vuelta atrás',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No, me he equivocado de botón',
        reverseButtons: false,
      })
      .then((result) => {
        if (result.value) {
          donacion.estado = 'CANCELADO';
          this.donacionService.update(donacion).subscribe((don) => {
            this.router.navigate(['/solicitud-donacion']);
            swalWithBootstrapButtons.fire(
              'Solicitud de donación rechazada',
              ``,
              'success'
            );
          });
        }
      });
  }

  delete(donacion: Donacion): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mx-2',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Estás seguro de borrar la solicitud de donacion?',
        text: 'Esta acción no tiene vuelta atrás',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, deseo eliminar la solicitud de donación',
        cancelButtonText: 'Cancelar',
        reverseButtons: false,
      })
      .then((result) => {
        if (result.value) {
          this.donacionService.delete(donacion.id).subscribe((response) => {
            this.listaDonaciones = this.listaDonaciones.filter(
              (don) => don !== donacion
            );
            this.router.navigate(['/solicitud-donacion']);
            swalWithBootstrapButtons.fire(
              'Solicitud de donación eliminada',
              ``,
              'success'
            );
          });
        }
      });
  }
}
