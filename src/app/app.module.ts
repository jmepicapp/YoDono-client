import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './layout/menu/menu.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PaginatorComponent } from './layout/paginator/paginator.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { SharedModule } from './shared/shared.module';
import { NewAccountComponent } from './components/usuarios/new-account/new-account.component';
import { HomeComponent } from './components/home/home.component';
import { SolicitudDonacionComponent } from './components/solicitud-donacion/solicitud-donacion.component';
import { SolicitudDonacionFormComponent } from './components/solicitud-donacion/solicitud-donacion-form/solicitud-donacion-form.component';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    PaginatorComponent,
    EmpresasComponent,
    LoginComponent,
    NewAccountComponent,
    HomeComponent,
    SolicitudDonacionComponent,
    SolicitudDonacionFormComponent
    ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
