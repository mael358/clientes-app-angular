import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { Cliente } from './cliente';
import { ModalService } from './detalle/modal.service';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';

import { URL_BACKEND } from '../config/config';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  clienteSeleccionado: Cliente;
  paginator: any;

  urlBackend: string = URL_BACKEND;

  constructor(private clienteService: ClientesService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.clienteService.getClientes(page).subscribe(
        response => {
          this.clientes = (response.content as Cliente[])
          this.paginator = response;
        }
      );
    });

    this.modalService.notificarUpload.subscribe(cliente => {
      this.clientes = this.clientes.map(clienteOriginal => {
        if(cliente.id == clienteOriginal.id){
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      });
    });
  }

  delete(cliente: Cliente): void {
    swal.fire({
      title: '¿Estás seguro de eliminar?',
      text: "Eliminarás completamente el registro.",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, ¡Eliminalo!'
    }).then((result) => {

      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe((response) => {
          this.clientes = this.clientes.filter(cli => cli !== cliente)
          swal.fire('Cliente eliminado', `Cliente ${cliente.nombre} eliminado con éxito`, 'success');
        });
      }
    })
  }

  abrirModal(cliente: Cliente){
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }

}
