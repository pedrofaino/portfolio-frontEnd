export class Edu {
    id?:number;
    nombreEdu:string;
    fecha: string;
    url_foto:string;
    descripcionEdu:string;

    constructor(nombreEdu:string, fecha:string, url_foto:string, descripcionEdu:string){
        this.nombreEdu=nombreEdu;
        this.fecha = fecha;
        this.url_foto = url_foto;
        this.descripcionEdu=descripcionEdu;
    }

}
