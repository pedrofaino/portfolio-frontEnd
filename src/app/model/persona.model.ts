export class persona{
    id?: number;
    nombre: string;
    apellido: string;
    url_foto: string;

    constructor(nombre:string, apellido:string, url_foto:string){
        this.nombre=nombre;
        this.apellido=apellido;
        this.url_foto=url_foto;
    }
}