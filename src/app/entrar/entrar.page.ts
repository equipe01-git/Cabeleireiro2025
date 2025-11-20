import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonButton, IonInput, IonInputPasswordToggle, 
  IonGrid, IonRow, IonCol, AlertController 
} from '@ionic/angular/standalone';
import { RouterModule, Router } from '@angular/router';

import { auth, db } from '../../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.page.html',
  styleUrls: ['./entrar.page.scss'],
  standalone: true,
  imports: [
    IonContent, CommonModule, FormsModule, IonButton, IonInput, 
    IonInputPasswordToggle, RouterModule, IonGrid, IonRow, IonCol
  ]
})
export class EntrarPage implements OnInit {

  email = '';
  senha = '';

  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {}

  async entrar() {
    try {
      const cred = await signInWithEmailAndPassword(auth, this.email, this.senha);
      const user = cred.user;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      const data: any = snap.data();

      const role = data?.role ?? "cliente";

      if (role === "barbeiro") {
        this.router.navigate(['/barbeiro']);
      } else {
        this.router.navigate(['/home']);
      }

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

}
