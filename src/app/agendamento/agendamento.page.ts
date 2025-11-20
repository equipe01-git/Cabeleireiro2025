import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonBackButton,
  IonItem,
  IonLabel,
  IonButtons,
  IonToolbar,
  IonTitle,
  IonContent,
  IonModal,
  IonButton,
  IonList
} from '@ionic/angular/standalone';

import { db, auth } from '../../firebase-config';
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs
} from 'firebase/firestore';

@Component({
  selector: 'app-calendario',
  templateUrl: './agendamento.page.html',
  styleUrls: ['./agendamento.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonModal,
    IonButton,
    IonBackButton,
    IonButtons,
    IonItem,
    IonLabel,
    IonList
  ],
})
export class CalendarioComponent implements OnInit, AfterViewInit {

  @ViewChild('modalHorarios') modalHorarios!: IonModal;
  @ViewChild('modalServicos') modalServicos!: IonModal;
  @ViewChild('modalData') modalData!: IonModal;

  dataSelecionada: string | null = null;
  dataExibicao: string = 'Nenhuma data selecionada';
  dataMinima: string = '';

  private tempDate: string | null = null;

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
    this.definirDataMinima();
    this.formatarDataExibicao();
  }

  ngAfterViewInit() {}

  definirDataMinima() {
    const hoje = new Date();
    hoje.setHours(0,0,0,0);
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    this.dataMinima = `${ano}-${mes}-${dia}`;
  }

  formatarDataExibicao() {
    if (!this.dataSelecionada) {
      this.dataExibicao = 'Nenhuma data selecionada';
      return;
    }
    const [year, month, day] = this.dataSelecionada.split('-').map(Number);
    const dataObj = new Date(year, month - 1, day);
    this.dataExibicao = new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric', month: 'long', day: 'numeric'
    }).format(dataObj);
  }

  async confirmarData(modal: IonModal) {
    const chosen = this.dataSelecionada || this.tempDate;
    if (!chosen) {
      alert('Escolha uma data antes de confirmar.');
      return;
    }

    const [year, month, day] = chosen.split('-').map(Number);
    const normalized = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    this.dataSelecionada = normalized;

    const now = new Date();
    now.setHours(0,0,0,0);

    const [y,m,d] = this.dataSelecionada.split('-').map(Number);
    const selectedDate = new Date(y, m - 1, d);
    selectedDate.setHours(0,0,0,0);

    const isHoje = now.getTime() === selectedDate.getTime();

    const availableCount = await this.checkAvailabilityForSelectedDate();

    if (availableCount === 0 && !isHoje) {
      alert('Esta data está totalmente lotada. Escolha outra data.');
      return;
    }

    this.formatarDataExibicao();
    modal.dismiss();
  }

  private generateBaseTimes(): string[] {
    const times: string[] = [];
    const START_HOUR = 9;
    const END_HOUR = 18;
    const INTERVAL_MINUTES = 40;

    for (let total = START_HOUR * 60; total <= END_HOUR * 60; total += INTERVAL_MINUTES) {
      const h = Math.floor(total / 60);
      const m = total % 60;
      times.push(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`);
    }
    return times;
  }

  private async computeAvailableTimesForSelectedDate(): Promise<string[]> {
    if (!this.dataSelecionada) return [];

    let times = this.generateBaseTimes();

    const now = new Date();

    const [y,m,d] = this.dataSelecionada.split('-').map(Number);
    const selectedDate = new Date(y, m - 1, d);

    const hoje = new Date();
    hoje.setHours(0,0,0,0);

    const selectedMidnight = new Date(selectedDate);
    selectedMidnight.setHours(0,0,0,0);

    const isHoje = hoje.getTime() === selectedMidnight.getTime();

    if (isHoje) {
      times = times.filter(t => {
        const [hh, mm] = t.split(':').map(Number);
        const dt = new Date();
        dt.setHours(hh, mm, 0, 0);
        return dt > now;
      });
    }

    const ocupados = await this.loadOccupiedTimes(this.dataSelecionada);
    if (ocupados.length) {
      times = times.filter(t => !ocupados.includes(t));
    }

    return times;
  }

  async openHorarioPicker() {
    if (!this.dataSelecionada) {
      alert('Escolha uma data primeiro.');
      return;
    }

    const times = await this.computeAvailableTimesForSelectedDate();
    if (times.length === 0) {
      alert('Não há horários disponíveis nessa data.');
      return;
    }

    this.availableTimes = times;
    this.modalHorarios.present();
  }

  selectTime(time: string) {
    this.horarioSelecionado = time;
    this.horarioExibicao = time;
    this.modalHorarios.dismiss();
  }

  openServicePicker() {
    this.modalServicos.present();
  }

  selectService(service: string) {
    this.serviceSelecionado = service;
    this.serviceExibicao = service;
    this.modalServicos.dismiss();
  }

  private async loadOccupiedTimes(dateYYYYMMDD: string): Promise<string[]> {
    try {
      const ref = collection(db, 'agendamentos');
      const q = query(ref, where('data', '==', dateYYYYMMDD));
      const snap = await getDocs(q);

      return snap.docs
        .map(d => d.data()?.['horario'] ?? null)
        .filter(Boolean);
    } catch (err) {
      console.error('Erro loadOccupiedTimes:', err);
      return [];
    }
  }

  private async checkAvailabilityForSelectedDate(): Promise<number> {
    const times = await this.computeAvailableTimesForSelectedDate();
    return times.length;
  }

  async confirmarAgendamento() {
    if (!auth?.currentUser) {
      alert('Erro: usuário não está logado.');
      return;
    }

    if (!this.dataSelecionada || !this.horarioSelecionado || !this.serviceSelecionado) {
      alert('Preencha data, horário e serviço antes de confirmar.');
      return;
    }

    try {
      const ocupados = await this.loadOccupiedTimes(this.dataSelecionada);
      if (ocupados.includes(this.horarioSelecionado)) {
        alert('Este horário acabou de ser reservado por outro usuário. Escolha outro horário.');
        this.horarioSelecionado = null;
        this.horarioExibicao = 'Nenhum horário selecionado';
        return;
      }

      const payload = {
        userId: auth.currentUser.uid,
        data: this.dataSelecionada,
        horario: this.horarioSelecionado,
        servico: this.serviceSelecionado,
        criadoEm: serverTimestamp()
      };

      await addDoc(collection(db, 'agendamentos'), payload);
      alert('Agendamento realizado com sucesso!');

      this.dataSelecionada = null;
      this.dataExibicao = 'Nenhuma data selecionada';
      this.horarioSelecionado = null;
      this.horarioExibicao = 'Nenhum horário selecionado';
      this.serviceSelecionado = null;
      this.serviceExibicao = 'Nenhum serviço selecionado';
      this.availableTimes = [];

    } catch (err) {
      console.error('Erro ao salvar no Firestore:', err);
      alert('Erro ao salvar no Firestore.');
    }
  }
}
