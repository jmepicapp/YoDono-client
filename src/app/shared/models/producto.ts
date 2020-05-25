import { Donacion } from './donacion';
import { CategoriaProducto } from './categoria-producto';

export class Producto {
    id: number;
    nombre: string;
    cantidad: number;
    medida: string;
    donacion: Donacion;
    categoria: CategoriaProducto;
}