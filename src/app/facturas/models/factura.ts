import {ItemFactura} from './item-factura';
import {Cliente} from '../../clientes/cliente';

export class Factura {
  id: number;
  descripcion: string;
  observacion: string;
  items: Array<ItemFactura> = [];
  cliente: Cliente;
  total: number;
  createAt: string;

  calcularGranTotal(): number{
    this.total = 0;
    this.items.forEach((item: ItemFactura) => {
      this.total += item.calcularLinea();
    })
    return this.total;
  }
}
