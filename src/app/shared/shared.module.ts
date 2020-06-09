import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { DonanteService } from './services/donante/donante.service';
import { EmpresaService } from './services/empresa/empresa.service';
import { DonacionService } from './services/donacion/donacion.service';
import { PreferenciaService } from './services/preferencia/preferencia.service';
import { CategoriaProductoService } from './services/categoria-producto/categoria-producto.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    DonanteService,
    EmpresaService,
    DonacionService,
    PreferenciaService,
    CategoriaProductoService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class SharedModule { }
