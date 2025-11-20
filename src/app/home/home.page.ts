import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonTitle, IonHeader, IonContent, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { getAuth, signOut } from 'firebase/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonTitle, IonHeader, IonContent, IonToolbar, IonButton, RouterLink]
})
export class HomePage {
  
  constructor(private navCtrl: NavController) {}

  async logout() {
    try {
      const auth = getAuth();
      await signOut(auth);
      alert("Você saiu da conta.");
      this.navCtrl.navigateRoot('/entrar'); // redireciona para login
    } catch (err) {
      console.error("Erro ao sair:", err);
      alert("Erro ao sair da conta.");
    }
  }
}
