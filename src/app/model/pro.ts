export class Pro {
    id?:number;
    nombreP:string;
    fecha:string;
    link:string;
    descripcionP:string;

    constructor(nombreP:string, fecha:string, link:string, descripcionP:string){
        this.nombreP=nombreP;
        this.fecha=fecha;
        this.link = link;
        this.descripcionP=descripcionP;
    }
}
