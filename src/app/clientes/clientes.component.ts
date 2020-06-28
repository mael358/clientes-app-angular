import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { Cliente } from './cliente';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteService: ClientesService ) { }

  ngOnInit(): void {
      this.clienteService.getClientes().subscribe(
        clientes => this.clientes = clientes
        //function (clientes) {
        //  this.clientes = clientes
        //}
      );
    }

    delete(cliente: Cliente): void {
      swal.fire({
        title: '¿Estás seguro de eliminar?',
        text: "Eliminarás completamente el registro.",
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText:'Cancelar',
        confirmButtonText: 'Si, ¡Eliminalo!'
        }).then((result) => {

        if (result.value) {
          this.clienteService.delete(cliente.id).subscribe( (response) => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swal.fire('Cliente eliminado', `Cliente ${cliente.nombre} eliminado con éxito`, 'success');
          });
        }
      })
    }

 }
