import { Articulo } from './articulo';
import { Pedido } from './pedido';
export interface Evento {

    codigoCliente?: string
    nombre?: string
    numero?: number
    fechaEntrega?: Date
    codigoTransportistaEnvios?: number
    suPedido?: string
    estado?: number
    codigoTransportista?: number
    transportista?: string
    serie?: string
    isTransportista?:boolean
    ejercicio?:number
    isFacturado?:boolean
    descripcion?:string
    unidades?:number
    lineas?:Articulo[]



}
