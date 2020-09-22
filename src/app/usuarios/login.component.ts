import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: string = 'Iniciar sesión';
  usuario: Usuario;

  constructor(private authService: AuthService,
     private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated){
      swal.fire('Información', `Hola ${this.authService.usuario.username}, ya estas autenticado`, 'info');
      this.router.navigate(['/clientes']);
    }
  }

  login(){
    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null){
      swal.fire('Error', 'Usuario o contraseña vacias!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['/clientes']);
      swal.fire('¡Bienvenido!', `Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success');
      //manejando el error de login
    }, e =>{
      if(e.status == 400){
        swal.fire('Error', 'Usuario o contraseña incorrecta!', 'error');
      }
    });
  }

}
