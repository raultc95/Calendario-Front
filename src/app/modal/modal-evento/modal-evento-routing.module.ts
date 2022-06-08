import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalEventoPage } from './modal-evento.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEventoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalEventoPageRoutingModule {}
