import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, 
  IonBackButton, IonButton, IonInput, AlertController
} from '@ionic/angular/standalone';

import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase-config';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButtons, IonBackButton, IonButton, IonInput
  ]
})
export class RecuperarPage {

  email: string = "";

  constructor(private alertController: AlertController) {}

  async enviar() {

    if (!this.email.trim()) {
      const alert = await this.alertController.create({
        header: "Campo vazio",
        message: "Digite seu e-mail para continuar.",
        buttons: ["OK"]
      });
      await alert.present();
      return;
    }

    try {
      await sendPasswordResetEmail(auth, this.email);

      const alert = await this.alertController.create({
        header: "E-mail enviado!",
        message: "Enviamos um link para redefinir sua senha. Verifique sua caixa de entrada.",
        buttons: ["OK"]
      });

      await alert.present();

    } catch (erro: any) {
      console.error(erro);

      const alert = await this.alertController.create({
        header: "Erro",
        message: "Não conseguimos enviar o e-mail. Verifique se o endereço está correto.",
        buttons: ["OK"]
      });

      await alert.present();
    }
  }
}
