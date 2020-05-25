import { Direccion } from './direccion';
import { Usuario } from './usuario';

export class Donante {
    id: number;
    nombre: string;
    apellidos: string;
    telefono: number;
    direccion: Direccion;
    usuario: Usuario;
}