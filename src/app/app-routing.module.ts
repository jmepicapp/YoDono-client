import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/usuarios/login/login.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { RolGuard } from './shared/guards/rol.guard';
import { HomeComponent } from './components/home/home.component';
import { SolicitudDonacionComponent } from './components/solicitud-donacion/solicitud-donacion.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'empresas', component: EmpresasComponent},
  {path: 'empresas/page/:page', component: EmpresasComponent, canActivate: [RolGuard]},
  {path: 'solicitud-donacion/form/:id', component: SolicitudDonacionComponent, canActivate: [RolGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
