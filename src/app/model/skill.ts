export class Skill {
    id?:number;
    nombreS:string;
    percent:number;
    url_foto:string;

    constructor(nombreS:string, percent:number, url_foto:string){
        this.nombreS = nombreS;
        this.percent = percent;
        this.url_foto = url_foto;
    }
}
