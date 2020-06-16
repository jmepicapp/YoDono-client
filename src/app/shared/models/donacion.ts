import { Empresa } from './empresa';
import { Donante } from './donante';

export class Donacion{
    id?: number;
    descripcion: string;
    fechaCreacion: string;
    estado: string;
    donante: Donante;
    empresa: Empresa;
    expira: string;
}