import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/usuarios/login/login.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { RolGuard } from './shared/guards/rol.guard';


const routes: Routes = [
  {path: 'empresas', component: EmpresasComponent, canActivate: [RolGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
