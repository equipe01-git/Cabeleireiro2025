import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, 
  IonIcon, IonBackButton, IonAccordionGroup, IonAccordion, 
  IonItem, IonLabel, IonNote, AlertController, IonButton
} from '@ionic/angular/standalone';

import { auth, db } from '../../firebase-config';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
  standalone: true,
  imports: [
    IonLabel, IonItem, IonAccordion, IonAccordionGroup,
    IonBackButton, IonIcon, IonButtons, IonContent, IonHeader,
    IonTitle, IonToolbar, CommonModule, FormsModule, IonButton
  ]
})
export class HistoricoPage implements OnInit {

  agendamentos: any[] = [];
  carregando: boolean = true;

  constructor(private alertController: AlertController) {}

  ngOnInit() {
    this.buscarAgendamentosUsuario();
  }

  buscarAgendamentosUsuario() {
    const usuario = auth.currentUser;

    if (!usuario) {
      console.warn("Nenhum usuário logado.");
      this.carregando = false;
      return;
    }

    const ref = collection(db, "agendamentos");
    const q = query(ref, where("userId", "==", usuario.uid));

    onSnapshot(q, (snapshot) => {
      this.agendamentos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      this.agendamentos.sort((a: any, b: any) => a.data.localeCompare(b.data));
      this.carregando = false;
    });
  }

  async cancelarAgendamento(id: string) {
    const alert = await this.alertController.create({
      header: "Cancelar Agendamento",
      message: "Tem certeza que deseja cancelar este horário?",
      buttons: [
        { text: "Não", role: "cancel" },
        {
          text: "Sim",
          handler: async () => {
            await deleteDoc(doc(db, "agendamentos", id));
          }
        }
      ]
    });

    await alert.present();
  }

  formatarData(data: string) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

}
