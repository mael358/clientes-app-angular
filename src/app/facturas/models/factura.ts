import {ItemFactura} from './item-factura';
import {Cliente} from '../../clientes/cliente';

export class Factura {
  id: number;
  descripciom: string;
  observacion: string;
  items: Array<ItemFactura> = [];
  cliente: Cliente;
  total: number;
  createAt: string;
}
