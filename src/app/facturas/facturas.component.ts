import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura';
import { ClientesService } from '../clientes/clientes.service';
import { ActivatedRoute } from '@angular/router';

import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html'
})
export class FacturasComponent implements OnInit {

  titulo: string = 'Nueva factura';
  factura: Factura = new Factura();

  autoCompleteControl = new FormControl();
  productos: string[] = ['Mesa', 'Television', 'Nintendo switch', 'Tablet', 'Sony'];
  productosFiltrados: Observable<string[]>;

  constructor(private clienteService: ClientesService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let clienteId = +params.get('clienteId');
      this.clienteService.getCliente(clienteId).subscribe(cliente => this.factura.cliente = cliente)
    });
    this.productosFiltrados = this.autoCompleteControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.productos.filter(producto => producto.toLowerCase().includes(filterValue));
  }

}
