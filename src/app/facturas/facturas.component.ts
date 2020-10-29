import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura';
import { ClientesService } from '../clientes/clientes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html'
})
export class FacturasComponent implements OnInit {

  titulo: string = 'Nueva factura';
  factura: Factura = new Factura();

  constructor(private clienteService: ClientesService,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let clienteId = +params.get('clienteId');
      this.clienteService.getCliente(clienteId).subscribe(cliente => this.factura.cliente = cliente)
    });
  }

}
