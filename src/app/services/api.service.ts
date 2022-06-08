import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Evento } from '../shared/evento';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 api:string=environment.URL_API
 
  constructor(public http:HttpClient) { }

  test(){

    let url = this.api+"api/calendario"
    

    let needForApi = {
      Texto: "Bienvenido"
    }

    return this.http.post<any>(url,needForApi);
  }
  modificaEvento(evento:Evento){
    let url = this.api+"api/modifica"

    let needForApi = {
      calendario: evento
    }
    console.log(needForApi);
    
    return this.http.post<any>(url,needForApi);

  }
  transportista(){

    let url = this.api+"api/transportista"
    

    let needForApi = {
      Texto: "Bienvenido"
    }

    return this.http.post<any>(url,needForApi);
  }

}
