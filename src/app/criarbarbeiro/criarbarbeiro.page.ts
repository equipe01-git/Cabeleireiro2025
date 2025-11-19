import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonInput, IonInputPasswordToggle, IonGrid, IonRow, IonCol, AlertController } from '@ionic/angular/standalone';
import { RouterModule, Router } from '@angular/router';
import { auth, db } from '../../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-criar',
  templateUrl: './criarbarbeiro.page.html',
  styleUrls: ['./criarbarbeiro.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton, IonInput, IonInputPasswordToggle, RouterModule, IonGrid, IonRow, IonCol]
})
export class CriarbarbeiroPage implements OnInit {

  constructor(private alertController: AlertController, private router: Router) {}

  nome = '';
  sobrenome = '';
  email = '';
  senha = '';

  async cadastrar() {
    try {
      const cred = await createUserWithEmailAndPassword(auth, this.email, this.senha);

      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        nome: this.nome,
        sobrenome: this.sobrenome,
        email: this.email
      });

      const alert = await this.alertController.create({
        header: 'Sucesso!',
        message: 'Conta criada com sucesso!',
        buttons: ['OK']
      });

      await alert.present();

      this.router.navigate(['/entrarbarbeiro']);

    } catch (erro) {
      console.error("Erro ao cadastrar:", erro);
    }
  }
  
  ngOnInit() {}
}
