import { Injectable } from '@angular/core';
import { formatDate, DatePipe } from '@angular/common';
import { Cliente } from './cliente';
import { Municipio } from './municipio';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';

@Injectable()
export class ClientesService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router,
    private authService: AuthService) { }

  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNotAuthorized(e): boolean{
    if(e.status == 401){

      if(this.authService.isAuthenticated()){
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }

    if(e.status == 403){
      swal.fire('Acceso denegado', `Hola ${this.authService.usuario.nombre} no tienes acceso a este recurso`, 'warning');
      this.router.navigate(['/clientes']);
      return true;
    }

    return false;
  }

  getMunicipios(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(this.urlEndPoint + "/municipios", {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNotAuthorized(e);
        return throwError(e);
      })
    );
  }

  //Ejemplo de GET
  getClientes(page: number): Observable<any> {
    return this.http.get<Cliente[]>(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log("Cliente service tap 1");
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        })
      }),
      map((response: any) => {
        (response.content as Cliente[]).map(
          cliente => {
            cliente.nombre = cliente.nombre.toUpperCase();
            cliente.apellido = cliente.apellido.toUpperCase();
            let datePipe = new DatePipe('es');
            cliente.createAt = datePipe.transform(cliente.createAt, 'fullDate');//formatDate(cliente.createAt, 'EEEE dd, MMMM yyyy', 'en-US');
            return cliente;
          });
        return response;
      })
    );
  }

  //Ejemplo de POST
  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, { headers: this.agregarAuthorizationHeader() }).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if (this.isNotAuthorized(e)) {
          return throwError(e);
        }

        if (e.status == 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (this.isNotAuthorized(e)) {
          return throwError(e);
        }
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire('Error al buscar cliente', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    console.log(cliente);
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNotAuthorized(e)) {
          return throwError(e);
        }

        if (e.status == 400) {
          return throwError(e);
        }


        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNotAuthorized(e)) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if (token != null){
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload/`, formData, {
      reportProgress: true,
      headers: httpHeaders
    });

    console.log(req)

    return this.http.request(req).pipe(
      catchError(e => {
        this.isNotAuthorized(e);
        return throwError(e);
      })
    );
  }

}
