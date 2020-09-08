import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClientesService } from './clientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Municipio } from './municipio';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public municipios: Municipio[];
  public titulo: string = "Crear cliente";
  public errors: string[];
  constructor(private clienteService: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.cargarCliente();
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        console.log(cliente);
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo cliente', `El cliente ${cliente.nombre} ha sido creado con éxito!`, 'success');
      },
      err => {
        this.errors = err.error.errors as string[];
        console.error("Codigo de error desde el backend" + err.status);
        console.error(this.errors);
      }
    )
  }

  public cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clienteService.getCliente(id).subscribe(
          (cliente) => {
            this.cliente = cliente;
          }
        )
      }
    });
    this.clienteService.getMunicipios().subscribe(municipios => this.municipios = municipios);
  }

  update(): void {
    swal.fire({
      title: '¿Estás seguro de editar?',
      text: "Puedes editarlo de nuevo pero no podrás regresar los cambios.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, ¡Editalo!'
    }).then((result) => {
      if (result.value) {
        this.clienteService.update(this.cliente).subscribe(
          response => {
            this.router.navigate(['/clientes'])
            swal.fire('Cliente actualizado', `${response.mensaje}`, 'success');
          },
          err => {
            this.errors = err.error.errors as string[];
            console.error("Codigo de error desde el backend: " + err.status);
            console.error(this.errors);
          }
        )
      }
    })
  }

  compararMunicipio(m1: Municipio, m2: Municipio) {
    return m1 === null || m2 === null ? false : m1.id === m2.id;
  }

}
