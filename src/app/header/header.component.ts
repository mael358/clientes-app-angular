import { Component } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {
    title: string = 'App Angular'

    constructor(public authService: AuthService, private router: Router){ }

    logout(): void{
      this.authService.logout();
      swal.fire('Correcto', 'Se ha cerrado sesión correctamente', 'success');
      this.router.navigate(['/login']);
    }
}
