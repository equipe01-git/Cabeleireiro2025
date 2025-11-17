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
  IonDatetime, 
  IonModal, 
  IonButton, 
  DatetimeChangeEventDetail, 
  IonIcon, 
  IonAccordion, 
  IonList, 
  IonNote, 
  IonAccordionGroup, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-calendario',
  templateUrl: './agendamento.page.html',
  styleUrls: ['./agendamento.page.scss'],
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
    // Componentes Ionic que serão usados:
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonDatetime,
    IonModal,
    IonButton,
    IonBackButton,
    IonButtons,
    IonItem,
    IonLabel,
    IonList],
})
export class CalendarioComponent implements OnInit, AfterViewInit {
openPicker() {
throw new Error('Method not implemented.');
}

  // --- Propriedades de Classe (ViewChild e Variáveis de Estado) ---
  @ViewChild('modalHorarios') modalHorarios!: IonModal; 
  @ViewChild('modalServicos') modalServicos!: IonModal
  
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

  // --- Construtor e Ciclo de Vida ---
  constructor() { }

  ngOnInit() {
    this.generateAvailableTimes();
  }
  ngAfterViewInit() {
    console.log('Modais carregados. Horários:', !!this.modalHorarios, 'Serviços:', !!this.modalServicos);
  }
  // --- Funções de Data ---

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

  // --- Funções de Horário ---

  generateAvailableTimes() {
        this.availableTimes = []; // Limpa a lista
        const START_HOUR = 9;  // 09:00
        const END_HOUR = 18;   // 18:00
        const INTERVAL_MINUTES = 40;

        // Converte o início e o fim para minutos totais desde a meia-noite
        const totalStartMinutes = START_HOUR * 60; // 540 minutos (9 * 60)
        const totalEndMinutes = END_HOUR * 60;     // 1080 minutos (18 * 60)

        // Loop em minutos, começando em 540 e incrementando 40 a cada vez
        for (let totalMinutes = totalStartMinutes; totalMinutes <= totalEndMinutes; totalMinutes += INTERVAL_MINUTES) {
            
            // 1. Calcula a hora e os minutos
            const h = Math.floor(totalMinutes / 60);
            const m = totalMinutes % 60;

            // 2. Regra de Exclusão (Para garantir que só o 18:00 entre, se o 18:40 for gerado)
            if (h > END_HOUR || (h === END_HOUR && m > 0)) {
                continue; // Pula qualquer horário depois de 18:00
            }

            // 3. Formata e adiciona
            const hour = String(h).padStart(2, '0');
            const minute = String(m).padStart(2, '0');
            this.availableTimes.push(`${hour}:${minute}`);
        }
        
        console.log('Horários gerados com intervalo constante:', this.availableTimes);
    }
  
  // Abre o modal de Horário
  openHorarioPicker() {
    if (this.modalHorarios) {
      this.modalHorarios.present(); 
    } else {
      console.error('ERRO: Modal de Horários é nulo. Verifique #modalHorarios no HTML.');
    }
  }

  // Seleciona e fecha o modal de Horário
  selectTime(time: string) {
    this.horarioSelecionado = time;
    this.horarioExibicao = time; 
    console.log('Horário selecionado atualizado:', this.horarioSelecionado);
    this.modalHorarios.dismiss(time, 'select'); 
  }

  // --- Funções de Serviço ---

  // Abre o modal de Serviço
  openServicePicker() {
    if (this.modalServicos) {
      this.modalServicos.present(); 
    } else {
      console.error('ERRO: Modal de Serviços é nulo. Verifique #modalServicos no HTML.');
    }
  }

  // Seleciona e fecha o modal de Serviço
  selectService(service: string) {
    this.serviceSelecionado = service;
    this.serviceExibicao = service; 
    
    console.log('Serviço selecionado:', this.serviceSelecionado);

    this.modalServicos.dismiss(service, 'select'); 
  }
}
