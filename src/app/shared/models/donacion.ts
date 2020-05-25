import { Empresa } from './empresa';
import { Donante } from './donante';

export class Donacion{
    id: number;
    descripcionEmpresa: string;
    fechaCreacion: string;
    estado: string;
    donante: Donante;
    empresa: Empresa;
    
}