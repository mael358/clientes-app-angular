import {Producto} from './producto';

export class ItemFactura {
  producto: Producto;
  cantidad: number = 1;
  total: number;

  public calcularLinea(): number{
    return this.cantidad * this.producto.precio;
  }
}
