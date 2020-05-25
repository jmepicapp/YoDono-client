import { Direccion } from './direccion';
import { Usuario } from './usuario';

export class Empresa {
    id: number;
    nombre: string;
    telefono: number;
    direccion: Direccion;
    usuario: Usuario;
}