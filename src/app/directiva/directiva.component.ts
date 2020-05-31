import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {

  listaCurso: string[] = ['TypeScript', 'JavaScript', 'Java SE', 'C#', 'PHP']

  habilitado: boolean = true;
  btnMensaje: string = 'Ocultar';

  setHabilitar(): void{
    this.habilitado = (this.habilitado) ? false: true;
    this.btnMensaje = (this.habilitado) ? 'Ocultar' : 'Mostrar';
  }

  constructor() { }

}
