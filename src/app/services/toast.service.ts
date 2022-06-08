import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private myToast: any;
  constructor(public toast: ToastController) { }

  showToast(msn: string, clr: string) {
    this.myToast = this.toast.create({
      message: msn,
      color: clr,
      duration: 5000,
      animated: true  

    }).then((toastData) => {
      toastData.present();
    });
  }
  HideToast() {
    this.myToast = this.toast.dismiss();
  }
}

