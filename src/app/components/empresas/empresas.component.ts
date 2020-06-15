import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/shared/models';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresaService } from 'src/app/shared/services/empresa/empresa.service';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css'],
})
export class EmpresasComponent implements OnInit {
  listaEmpresas: Empresa[] = [];
  paginador: any;
  poblacion: string;

  constructor(
    private empresaService: EmpresaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getEmpresas();
  }

  getEmpresasByPoblacion(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }

      if (this.poblacion == null || this.poblacion === '') {
        this.getEmpresas();
      } else {
        this.empresaService
          .getEmpresasByPoblacion(this.poblacion, page)
          .pipe(
            tap((response) => {
              (response.content as Empresa[]).forEach((empresa) => {});
            })
          )
          .subscribe((response) => {
            (this.listaEmpresas = response.content as Empresa[]),
              (this.paginador = response);
          });
      }
    });
  }

  getEmpresas(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }

      this.empresaService
        .getEmpresas(page)
        .pipe(
          tap((response) => {
            (response.content as Empresa[]).forEach((empresa) => {});
          })
        )
        .subscribe((response) => {
          (this.listaEmpresas = response.content as Empresa[]),
            (this.paginador = response);
        });
    });
  }
}
