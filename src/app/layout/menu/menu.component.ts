import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Donante, Empresa, Usuario } from 'src/app/shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { DonanteService } from 'src/app/shared/services/donante/donante.service';
import { EmpresaService } from 'src/app/shared/services/empresa/empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  usuario: Usuario = new Usuario();

  donante: Donante = {
    usuario: this.usuario
  };
  empresa: Empresa = {
    usuario: this.usuario
  };

  constructor(
    public authService: AuthService,
    private donanteService: DonanteService,
    private empresaService: EmpresaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  logout(): void {
    this.authService.logout();
  }

  loadUser() {
    if (this.authService.hasRole('ROLE_DONANTE')) {
      this.loadDonante();
    } else if (this.authService.hasRole('ROLE_EMPRESA')) {
      this.loadEmpresa();
    }
  }

  loadDonante(): void {
    let email = this.authService.usuario.email;
    if (email) {
      this.donanteService.getDonanteByEmail(email).subscribe((donante) => {
        this.donante = donante;
      });
    }
  }

  loadEmpresa(): void {
    let email = this.authService.usuario.email;
    if (email) {
      this.empresaService.getEmpresaByEmail(email).subscribe((empresa) => {
        this.empresa = empresa;
      });
    }
  }

  updateUser(): void {
    if (this.authService.hasRole('ROLE_DONANTE')) {
      this.updateDonante(this.donante);
    } else if (this.authService.hasRole('ROLE_EMPRESA')) {
      this.updateEmpresa(this.empresa);
    }
  }

  updateDonante(donante: Donante): void {
    this.donanteService.update(donante).subscribe((response) => {
      Swal.fire('Datos modificados con éxito', '', 'success');
    });
  }

  updateEmpresa(empresa: Empresa): void {
    this.empresaService.update(empresa).subscribe((response) => {
      Swal.fire('Datos modificados con éxito', '', 'success');
    });
  }

  deleteUser(): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mx-2',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Estás seguro de borrar la cuenta?',
        text: 'Esta acción no tiene vuelta atrás',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, deseo eliminar cuenta definitivamente',
        cancelButtonText: 'Cancelar',
        reverseButtons: false,
      })
      .then((result) => {
        if (result.value) {
          if (this.authService.hasRole('ROLE_DONANTE')) {
            this.donanteService
              .delete(this.donante.id)
              .subscribe((response) => {
                this.authService.logout();
                this.router.navigate[('/empresas')];
                swalWithBootstrapButtons.fire(
                  'Cuenta eliminada',
                  'Esperamos verte de vuelta pronto',
                  'success'
                );
              });
          } else if (this.authService.hasRole('ROLE_EMPRESA')) {
            this.empresaService
              .delete(this.empresa.id)
              .subscribe((response) => {
                this.authService.logout();
                this.router.navigate[('/empresas')];
                swalWithBootstrapButtons.fire(
                  'Cuenta eliminada',
                  'Esperamos verte de vuelta pronto',
                  'success'
                );
              });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      });
  }
}
