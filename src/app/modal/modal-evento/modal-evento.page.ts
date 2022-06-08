import { Evento } from './../../shared/evento';
import { transportista } from './../../shared/transportista';
import { ApiService } from './../../services/api.service';
import { ToastService } from './../../services/toast.service';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-modal-evento',
  templateUrl: './modal-evento.page.html',
  styleUrls: ['./modal-evento.page.scss'],
})
export class ModalEventoPage implements OnInit {
  @Input() eventsaw: Evento;
  public formEvento: FormGroup;
  public evento: Evento;
  public mitransportista: transportista;
  public transportistas: transportista[] = [];
  constructor(private modalController: ModalController, private toast: ToastService, private fb: FormBuilder, private api: ApiService) {
    this.formEvento = this.fb.group({

    });

  }

  ngOnInit() {
    console.log(this.eventsaw);

    this.api.transportista().subscribe((r: transportista[]) => {
      this.transportistas = r;


    });

  }
  public closeModal() {
    this.modalController.dismiss();
  }
  public actualizar() {

    if (this.mitransportista != null) {

      let edtevento: Evento = {
        codigoCliente: this.eventsaw.codigoCliente,
        nombre: this.eventsaw.nombre,
        numero: this.eventsaw.numero,
        fechaEntrega: this.eventsaw.fechaEntrega,
        codigoTransportistaEnvios: this.mitransportista.codigoTransportista,
        estado: this.eventsaw.estado,
        serie: this.eventsaw.serie,
        ejercicio: this.eventsaw.ejercicio,
        codigoTransportista: this.mitransportista.codigoTransportista,
        transportista: this.mitransportista.transportista,
        isTransportista: false,
        isFacturado: this.eventsaw.isFacturado,


      }
      console.log(edtevento);
      this.api.modificaEvento(edtevento).subscribe((r: Evento) => {
        this.evento = r;
        this.toast.showToast("Pedido actualizado", "success")
        console.log("CLOSE");
        
        this.closeModal();
        // window.location.reload();
      });
      //this.editEvento()


    } else {
      this.toast.showToast("No ha sido Posible actualizar el Pedido", "danger")
      this.closeModal();
    }


  }

  editEvento(p: Evento) {

  }

  public seleccionTransportista(event?) {
    const value: string = event.detail.value;
    this.mitransportista = {};
    this.transportistas.forEach(transportista => {
      if (transportista.codigoTransportista.toString().match(value)) {
        this.mitransportista.codigoTransportista = transportista.codigoTransportista;
        this.mitransportista.transportista = transportista.transportista;
      }
    });
  }

}
