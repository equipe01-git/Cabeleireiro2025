import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons,
  IonIcon, IonBackButton, IonAccordionGroup, IonAccordion,
  IonItem, IonLabel, AlertController, IonButton
} from '@ionic/angular/standalone';

import { auth, db } from '../../firebase-config';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

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

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.buscarAgendamentosUsuario(user.uid);
      } else {
        this.carregando = false;
      }
    });
  }

  buscarAgendamentosUsuario(uid: string) {
    const ref = collection(db, "agendamentos");
    const q = query(ref, where("userId", "==", uid));

    onSnapshot(q, (snapshot) => {
      const agora = new Date();

      this.agendamentos = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((a: any) => {
          const dataAg = new Date(`${a.data}T${a.horario}:00`);
          return dataAg >= agora; // Só mostra futuros
        })
        .sort((a: any, b: any) => {
          const dataA = new Date(`${a.data}T${a.horario}:00`).getTime();
          const dataB = new Date(`${b.data}T${b.horario}:00`).getTime();
          return dataA - dataB;
        });

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
