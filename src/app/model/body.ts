export class Body {
    id?:number;
    sobreMi:string;
    url_foto:string;
    url_Foto:string;

    constructor(sobreMi:string, url_foto:string){
        this.sobreMi=sobreMi;
        this.url_foto=url_foto;
        this.url_Foto=url_foto;
    }
}
