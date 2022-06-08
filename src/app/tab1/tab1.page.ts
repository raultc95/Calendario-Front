import { Pedido } from './../shared/pedido';
import { ModalEventoPage } from './../modal/modal-evento/modal-evento.page';
import { Evento } from './../shared/evento';
import { ApiService } from './../services/api.service';
import { daysToWeeks, getDate, getWeekOfMonth } from 'date-fns';
import { FechaService } from './../services/fecha.service';
import { DatePipe, FormStyle, getLocaleDayNames, getLocaleFirstDayOfWeek, getLocaleWeekEndRange, TranslationWidth, WeekDay } from '@angular/common';
import { Component, ViewChild, OnInit, Input, Output, EventEmitter, Inject, LOCALE_ID } from '@angular/core';
import { IonDatetime, LoadingController, ModalController } from '@ionic/angular';
import { CalendarModule } from 'ion2-calendar';
import { NgCalendarModule } from 'ionic2-calendar';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [DatePipe]
})
export class Tab1Page {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime
  @Input() name: string;
  @Input() type = 'date';

// @Input() value = new Date(Date.now()).toLocaleDateString();
  @Input() date_format;
  @Output() datePickerValue: EventEmitter<any> = new EventEmitter<any>();
  public searchTerm:string;
  private miLoading: HTMLIonLoadingElement
  public evento: Evento
  public miPedido: Pedido = {}
  public misPedidos: Pedido[]=[]
  public misEventosBD: Evento[]=[] 
  public misEventos: Evento[]=[]
  public misEventosX: Evento[]=[]
  public misEventosXD: Evento[]=[]
  dateValue: any;
  dateValue2 = "";

  
 
public firtDay
public lastDay
  localeDaysOfWeek = getLocaleDayNames(this.locale, FormStyle.Standalone, TranslationWidth.Wide);
  localeWeekEndRange = getLocaleWeekEndRange(this.locale);
  
  correctLocaleDaysOfWeek: string[];
  

  constructor(private loading: LoadingController, private modalController: ModalController, private api: ApiService,
    private datePipe: DatePipe, @Inject(LOCALE_ID) public locale: string) {
    
  }

  

  ionViewWillEnter() {
    this.datetime.firstDayOfWeek = 1
    this.llamadaTest();
  }


  getWeek($event){
    this.misPedidos=[];
    //this.llamadaTest();
    this.getFirstDayWofWeek($event);
    this.getlastDayWofWeek($event);
    
    var start = new Date(this.firtDay);
    var end = new Date(this.lastDay);
    
    var loop = new Date(start);

    this.api.test().subscribe((r:Evento[]) => {
      this.misEventosBD=r

      while(loop <= end){
        let aux
        let newPedido:Pedido={}
        
        
        newPedido.eventos=[]
        aux=this.datePipe.transform(loop,'dd/MM/yyyy')
        newPedido.dia=aux
        
        this.misEventosBD.forEach(elemento => {
          if(newPedido.dia==elemento.fechaEntrega){
           
            if(elemento.codigoTransportistaEnvios>0){
              elemento.isTransportista=true
            }else{
              elemento.isTransportista=false
            }
            if(elemento.estado==2){
              elemento.isFacturado=true;
              
            }else{
              elemento.isFacturado=false;
              
              
            }
            newPedido.eventos.push(elemento);
          }
        });
        this.misPedidos.push(newPedido);
        var newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
      }
    })
    
  }

  public async setbyEvByStatus(event?){
    
    this.misPedidos=[];
    this.llamadaTest();
   
    
    var start = new Date(this.firtDay);
    var end = new Date(this.lastDay);
    
    var loop = new Date(start);
    while(loop <= end){
      let aux
      let newPedido:Pedido={}
  
      newPedido.eventos=[]
      aux=this.datePipe.transform(loop,'dd/MM/yyyy')
      newPedido.dia=aux
      this.misEventosBD.forEach(elemento => {

        
        if(newPedido.dia==elemento.fechaEntrega){
         
          if(elemento.codigoTransportistaEnvios>0){
            elemento.isTransportista=true
          }else{
            elemento.isTransportista=false
          }
          if(elemento.estado==2){
            elemento.isFacturado=true;
            
          }else{
            elemento.isFacturado=false;
            
            
          }

          
          const value:string=event.detail.value;
      
          if("NoAsg".match(value)){
            
              if(!elemento.isFacturado && !elemento.isTransportista){
                newPedido.eventos.push(elemento);
              }
            
            
      
          } else if("Asig".match(value)){
            
            
              if(!elemento.isFacturado && elemento.isTransportista==true){
                newPedido.eventos.push(elemento);
              }
          }else if("NoAsgFac".match(value)){

              if(elemento.isFacturado && !elemento.isTransportista){
                newPedido.eventos.push(elemento);
              }

          }else if("Fact".match(value)){
              if(elemento.isFacturado && elemento.isTransportista){
                newPedido.eventos.push(elemento);
              }

          }else if("all".match(value)) {
            newPedido.eventos.push(elemento);
          }

        }
      });
      this.misPedidos.push(newPedido);
      var newDate = loop.setDate(loop.getDate() + 1);
      loop = new Date(newDate);
    }

  }

  refresh(){

  }

  getFirstDayWofWeek(d){
    const date = new Date(d);
    let first;
    let aux;
    const day = date.getDay();
    const diff = date.getDate() - day +(day===0 ? -6:1);
    first=new Date(date.setDate(diff));
    //aux=this.datePipe.transform(first,'dd-MM-yyyy')
    this.firtDay=first;
  }
  getlastDayWofWeek(d){
    const date = new Date(d);
    let first;
    let aux;
    const day = date.getDay();
    const diff = date.getDate() - day +(day===0 ? 0:7);
    first=new Date(date.setDate(diff));
    //aux=this.datePipe.transform(first,'dd-MM-yyyy')
    this.lastDay=first;
  }

  async openModal(eventsaw: Evento) {
    this.misEventosXD=this.misEventosBD
    const modal = await this.modalController.create({
      component: ModalEventoPage,
      mode: 'ios',
      componentProps: {
        'eventsaw': eventsaw

      }

    });

    /*modal.onDidDismiss().then(()=>{
        this.setbyEvByStatus();
    })*/

    modal.onDidDismiss().then(()=>{
  
      
      this.misPedidos = []
      this.getWeek(this.firtDay)
    //   this.misPedidos=[];
    // this.llamadaTest();
   
    
    // var start = new Date(this.firtDay);
    // var end = new Date(this.lastDay);
    // console.log(start);
    // console.log(end);
    
    // var loop = new Date(start);
    // while(loop <= end){
    //   console.log(loop);
      
    //   let aux
    //   let newPedido:Pedido={}
  
    //   newPedido.eventos=[]
    //   aux=this.datePipe.transform(loop,'dd/MM/yyyy')
    //   newPedido.dia=aux
    //   this.misEventosBD.forEach(elemento => {
    //     //console.log("ELEMENTO"+elemento.fechaEntrega);
    //     //console.log("New PEDIDO"+newPedido.dia);
        
        
    //     if(newPedido.dia==elemento.fechaEntrega){
    //      console.log("entra");
         
    //       if(elemento.codigoTransportistaEnvios>0){
    //         elemento.isTransportista=true
    //       }else{
    //         elemento.isTransportista=false
    //       }
    //       if(elemento.estado==2){
    //         elemento.isFacturado=true;
            
    //       }else{
    //         elemento.isFacturado=false;
            
            
    //       }  
        
    //         newPedido.eventos.push(elemento);
          

    //     }
    //   });
      
    //   console.log(newPedido);
      
    //   this.misPedidos.push(newPedido);
    //   var newDate = loop.setDate(loop.getDate() + 1);
    //   loop = new Date(newDate);
    // }
    }).then(()=>{
     
      
    }
    )
    
    await modal.present();
    
  }

  llamadaTest() {
    
  }
}
