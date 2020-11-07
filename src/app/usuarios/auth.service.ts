import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './usuario';

import { URL_BACKEND } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient) { }

  public get usuario(): Usuario{
    if(this._usuario != null){
      return this._usuario;
    } else if(this._usuario == null && sessionStorage.getItem('usuario') != null){
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string{
    if(this._token != null){
      return this._token;
    } else if(this._token == null && sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(usuario: Usuario): Observable<any> {
    const urlEndPoint =  URL_BACKEND + '/oauth/token';

    const credenciales = btoa('CRM_CLIENT' + ':' + 'MY_CRM_CLIENT');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    console.log(params.toString());
    return this.http.post<any>(urlEndPoint, params.toString(), { headers: httpHeaders });
  }

  guardarUsuario(access_token: string): void{
    let payload = this.obtenerPayload(access_token);
    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.email = payload.email;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    //guardando usuario en la sesion del navegador
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  obtenerPayload(access_token: string): any {
    if(access_token != null){
      return JSON.parse(atob(access_token.split(".")[1]));
    }
    return null;
  }

  guardarToken(access_token: string): void{
    this._token = access_token;
    sessionStorage.setItem('token', access_token);
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerPayload(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0){
      return true;
    }
    return false;
  }

  hasRole(role: string): boolean {
    if(this.usuario.roles.includes(role)){
      return true;
    }
    return false;
  }

  logout(): void{
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    // Para  borrar objetos en session storage indivudalmente
    //sessionStorage.removeItem('token');
    //sessionStorage.removeItem('usuario');
  }
}
