import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router){ }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      //en este return estamos validando el response, no lo que enviamos
    return next.handle(req).pipe(
      catchError(e => {
        if (e.status == 401) {

          if (this.authService.isAuthenticated()) {
            this.authService.logout();
          }
          this.router.navigate(['/login']);
        }

        if (e.status == 403) {
          swal.fire('Acceso denegado', `Hola ${this.authService.usuario.nombre} no tienes acceso a este recurso`, 'warning');
          this.router.navigate(['/clientes']);
        }

        return throwError(e);
      })
    );
  }
}
