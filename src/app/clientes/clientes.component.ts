import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { Cliente } from './cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clientesService: ClientesService ) { }

  ngOnInit(): void {
      this.clientesService.getClientes().subscribe(
        clientes => this.clientes = clientes
        //function (clientes) {
        //  this.clientes = clientes
        //}
      );
    }

 }
