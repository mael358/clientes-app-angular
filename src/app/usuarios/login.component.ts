import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: string = 'Iniciar sesión';


  constructor() { }

  ngOnInit(): void {
  }

}
