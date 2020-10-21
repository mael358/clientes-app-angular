import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Factura } from './models/factura';


@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html'
})
export class DetalleFacturaComponent implements OnInit {

  private urlEndPoint: string = 'http://localhost:8080/api/facturas';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getFactura(id: number): Observable<Factura>{
    return this.http.get<Factura>(`${this.urlEndPoint}/${id}`);
  }
}
