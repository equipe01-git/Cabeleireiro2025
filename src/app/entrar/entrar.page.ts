import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonInput, IonInputPasswordToggle, IonGrid, IonRow, IonCol, AlertController } from '@ionic/angular/standalone';
import { RouterModule, Router } from '@angular/router';
import { auth } from '../../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.page.html',
  styleUrls: ['./entrar.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton, IonInput, IonInputPasswordToggle, RouterModule, IonGrid, IonRow, IonCol]
})
export class EntrarPage implements OnInit {

  email = '';
  senha = '';

  constructor(private router: Router, private alertController: AlertController) {}

  async entrar() {
    try {
      await signInWithEmailAndPassword(auth, this.email, this.senha);

      this.router.navigate(['/home']);

    } catch (erro) {
      console.error("Erro ao entrar:", erro);

      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'E-mail ou senha incorretos!',
        buttons: ['OK']
      });

      await alert.present();
    }
  }

  ngOnInit() {}
}
