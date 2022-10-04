export class Experiencia {
    id? : number;
    nombreExp : string;
    periodo: string;
    url_logo:string;
    descripcionExp : string;

    constructor(nombreExp:string, periodo:string, url_logo:string, descripcionExp:string){
        this.nombreExp = nombreExp;
        this.periodo = periodo;
        this.url_logo = url_logo;
        this.descripcionExp = descripcionExp;
    }
}
