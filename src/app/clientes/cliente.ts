import {Municipio} from './municipio';
import {Factura} from '../facturas/models/factura';

export class Cliente {
  id: number;
  nombre: string;
  apellido: string;
  createAt: string;
  email: string;
  foto: string;
  municipio: Municipio;
  facturas: Array<Factura> = [];
}
