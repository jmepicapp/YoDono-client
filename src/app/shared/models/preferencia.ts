import { CategoriaProducto } from './categoria-producto';
import { PreferenciaId } from './preferencia-id';
import { Empresa } from './empresa';

export class Preferencia {
    id: PreferenciaId;
    empresa: Empresa;
    categoriaProducto: CategoriaProducto;
    necesidad: boolean;
    exclusion: boolean;
}