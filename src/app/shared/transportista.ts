import { Evento } from "./evento";


export interface transportista {

    codigoTransportista?:number;
    transportista?: string;
    miEvento?:Evento[];
}