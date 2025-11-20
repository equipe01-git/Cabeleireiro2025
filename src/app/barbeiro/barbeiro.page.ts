import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, 
  IonIcon, IonBackButton, IonItem, IonLabel, IonNote, IonButton
} from '@ionic/angular/standalone';

import { db } from '../../firebase-config';
import { auth } from '../../firebase-config';
import { signOut } from 'firebase/auth';

import { 
  collection, query, where, onSnapshot, doc, getDoc 
} from 'firebase/firestore';

@Component({
  selector: 'app-barbearia-agendamentos',
  templateUrl: './barbeiro.page.html',
  styleUrls: ['./barbeiro.page.scss'],
  standalone: true,
  imports: [
    IonNote, IonLabel, IonItem, IonToolbar, IonContent,
    IonButtons, IonBackButton, IonIcon, IonButton,
    IonHeader, IonTitle, CommonModule, FormsModule
  ]
})
export class BarbeiroPage implements OnInit {

  agendamentos: any[] = [];
  carregando: boolean = true;

  ngOnInit() {
    this.buscarAgendamentosDoDia();
  }

  async logout() {
    await signOut(auth);
    window.location.href = '/entrar'; // ou router.navigate()
  }

  buscarAgendamentosDoDia() {
    this.carregando = true;

    const hoje = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

    const ref = collection(db, "agendamentos");
    const q = query(ref, where("data", "==", hoje));

    onSnapshot(q, async (snapshot) => {
      const ags = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as any[];

      // pega todos os UIDs para buscar os nomes
      const userIds = [...new Set(ags.map(a => a.userId))];
      const usuarios: Record<string, any> = {};

      for (let uid of userIds) {
        const docRef = doc(db, "users", uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          usuarios[uid] = snap.data();
        }
      }

      this.agendamentos = ags.map(a => {
        const user = usuarios[a.userId] ?? {};
        const nomeCompleto =
          `${user.nome ?? ''} ${user.sobrenome ?? ''}`.trim() ||
          user.nome ||
          user.name ||
          "Usuário";

        return {
          ...a,
          nomeUsuario: nomeCompleto,
          servico: a.servico ?? "Serviço não informado"
        };
      });

      this.agendamentos.sort((a, b) => a.horario.localeCompare(b.horario));
      this.carregando = false;
    });
  }

  formatarData(data: string) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

}
