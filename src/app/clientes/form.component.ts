import { Component, OnInit } from '@angular/core';
import { Cliente} from './cliente';
import { ClientesService } from './clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente();
  private titulo: string = "Crear cliente";

  constructor(private clienteService: ClientesService, private router: Router) { }

  ngOnInit(): void {
  }

  public create(): void {
    console.log("Clicked!");
    console.log(this.cliente);
    this.clienteService.create(this.cliente).suscribe(
      response => this.router.navigate(['/clientes'])
    )
  }
}
