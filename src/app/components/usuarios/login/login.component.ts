import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/models';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  titulo: string = 'Iniciar Sesión';
  usuario: Usuario;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/empresas']);
    }
  }

  login(): void {
    if (this.usuario.email == null || this.usuario.password == null) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incorrectos',
        text: 'Introduzca un email y una contraseña válidos'
      });
    }

    this.authService.login(this.usuario).subscribe(response => {

      this.authService.saveUser(response.access_token);
      this.authService.saveToken(response.access_token);
      this.router.navigate(['/empresas']);
    },
    error => {
      if(error.status === 401){
        Swal.fire({
          icon: 'error',
          title: 'Campos incorrectos',
          text: 'Introduzca un email y una contraseña válidos'
        });
      }
    });
  }
}
