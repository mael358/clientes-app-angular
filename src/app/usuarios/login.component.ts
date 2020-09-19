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
  }

  login(){
    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null){
      swal.fire('Error', 'Usuario o contraseña vacias!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);
      let payload = JSON.parse(atob(response.access_token.split(".")[1]));
      console.log(payload);
      this.router.navigate(['/clientes']);
      swal.fire('¡Bienvenido!', `Hola ${payload.user_name}, has iniciado sesión con éxito!`, 'success');
    });
  }

}
