import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { 
  IonHeader, IonBackButton, IonItem, IonLabel, IonButtons, IonToolbar, 
  IonTitle, IonContent, IonDatetime, IonModal, IonButton, 
  DatetimeChangeEventDetail, IonList 
} from '@ionic/angular/standalone';

import { db, auth } from '../../firebase-config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

@Component({
  selector: 'app-calendario',
  templateUrl: './agendamento.page.html',
  styleUrls: ['./agendamento.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonDatetime, IonModal, IonButton, IonBackButton, IonButtons,
    IonItem, IonLabel, IonList
  ],
})
export class CalendarioComponent implements OnInit, AfterViewInit {

  @ViewChild('modalHorarios') modalHorarios!: IonModal; 
  @ViewChild('modalServicos') modalServicos!: IonModal;
  
  dataSelecionada: string | null = null;
  dataExibicao: string = 'Nenhuma data selecionada';

  horarioSelecionado: string | null = null;
  horarioExibicao: string = 'Nenhum horário selecionado';
  availableTimes: string[] = [];

  serviceSelecionado: string | null = null;
  serviceExibicao: string = 'Nenhum serviço selecionado';
  availableServices: string[] = [
    'Corte Social',
    'Corte Degradê',
    'Barba',
    'Corte + Barba',
    'Corte + Hidratação',
    'Progressiva',
  ];

  constructor() {}

  ngOnInit() {
    this.generateAvailableTimes();
  }

  ngAfterViewInit() {}

  // --- DATA ---
  handleDateChange(event: CustomEvent<DatetimeChangeEventDetail>) {
    this.dataSelecionada = event.detail.value as string | null;
    this.formatarDataExibicao();
  }

  formatarDataExibicao() {
    if (this.dataSelecionada) {
      const dataObj = new Date(this.dataSelecionada);
      this.dataExibicao = new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(dataObj);
    } else {
      this.dataExibicao = 'Nenhuma data selecionada';
    }
  }

  // --- HORÁRIOS ---
  generateAvailableTimes() {
    this.availableTimes = [];
    const START_HOUR = 9;
    const END_HOUR = 18;
    const INTERVAL_MINUTES = 40;

    const totalStartMinutes = START_HOUR * 60;
    const totalEndMinutes = END_HOUR * 60;

    for (let totalMinutes = totalStartMinutes; totalMinutes <= totalEndMinutes; totalMinutes += INTERVAL_MINUTES) {
      const h = Math.floor(totalMinutes / 60);
      const m = totalMinutes % 60;

      if (h > END_HOUR || (h === END_HOUR && m > 0)) continue;

      const hour = String(h).padStart(2, '0');
      const minute = String(m).padStart(2, '0');
      this.availableTimes.push(`${hour}:${minute}`);
    }
  }

  openHorarioPicker() {
    this.modalHorarios?.present();
  }

  selectTime(time: string) {
    this.horarioSelecionado = time;
    this.horarioExibicao = time;
    this.modalHorarios.dismiss(time, 'select');
  }

  // --- SERVIÇOS ---
  openServicePicker() {
    this.modalServicos?.present();
  }

  selectService(service: string) {
    this.serviceSelecionado = service;
    this.serviceExibicao = service;
    this.modalServicos.dismiss(service, 'select');
  }

  // --- SALVAR NO FIREBASE ---
  // importe setLogLevel caso queira logs do Firestore (opcional)
  // import { setLogLevel } from 'firebase/firestore';
  // setLogLevel('debug');

async confirmarAgendamento() {
  console.log('>>> confirmarAgendamento() chamado');

  // 1) Verifica se auth e db estão definidos
  console.log('auth (obj):', auth);
  console.log('auth.currentUser:', auth?.currentUser);
  console.log('db (obj):', db);

  // 2) Verifica valores que serão salvos
  console.log('dataSelecionada:', this.dataSelecionada);
  console.log('horarioSelecionado:', this.horarioSelecionado);
  console.log('serviceSelecionado:', this.serviceSelecionado);

  // 3) Validação rápida (avisa se tem algo errado antes de tentar salvar)
  if (!auth?.currentUser) {
    alert('Erro: usuário não está logado (auth.currentUser é null). Verifique o login.');
    return;
  }
  if (!db) {
    alert('Erro: configuração do Firestore (db) está indefinida. Me mande o arquivo firebase-config.ts de novo.');
    return;
  }
  if (!this.dataSelecionada || !this.horarioSelecionado || !this.serviceSelecionado) {
    alert('Preencha data, horário e serviço antes de confirmar.');
    return;
  }

  // 4) Tenta salvar e registra erro detalhado
  try {
    const payload = {
      userId: auth.currentUser.uid,
      data: this.dataSelecionada,
      horario: this.horarioSelecionado,
      servico: this.serviceSelecionado,
      criadoEm: serverTimestamp()
    };
    console.log('Payload a salvar:', payload);

    const ref = collection(db, 'agendamentos');
    console.log('Collection ref:', ref);

    const docRef = await addDoc(ref, payload);
    console.log('Agendamento salvo com sucesso. docId:', docRef.id);
    alert('Agendamento realizado com sucesso!');

    // limpar estados
    this.dataSelecionada = null;
    this.horarioSelecionado = null;
    this.serviceSelecionado = null;
    this.dataExibicao = 'Nenhuma data selecionada';
    this.horarioExibicao = 'Nenhum horário selecionado';
    this.serviceExibicao = 'Nenhum serviço selecionado';

  } catch (err:any) {
    // log completo do erro
    console.error('Erro ao addDoc:', err);
    // Mensagem amigável
    alert('Falha ao salvar agendamento. Veja console para detalhes.');
  }
}

}
