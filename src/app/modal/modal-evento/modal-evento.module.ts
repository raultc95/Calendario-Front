import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEventoPageRoutingModule } from './modal-evento-routing.module';

import { ModalEventoPage } from './modal-evento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEventoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalEventoPage]
})
export class ModalEventoPageModule {}
