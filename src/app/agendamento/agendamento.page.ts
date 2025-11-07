import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonDatetime, IonModal, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-calendario',
  templateUrl: './agendamento.page.html',
  styleUrls: ['./agendamento.page.scss'],
  standalone: true, // Importante para o Ionic Standalone
  imports: [
    CommonModule,
    FormsModule, // Necessário para o two-way data binding (ngModel)
    // Componentes Ionic que serão usados:
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonDatetime,
    IonModal,
    IonButton
  ],
})
export class CalendarioComponent implements OnInit {

  // Variável para armazenar a data selecionada pelo usuário
  dataSelecionada: string | null = null;

  // Variável para exibir a data formatada
  dataExibicao: string = 'Nenhuma data selecionada';

  constructor() { }

  ngOnInit() {
    // Pode-se inicializar a data com a data atual se necessário
    // this.dataSelecionada = new Date().toISOString();
    // this.formatarDataExibicao();
  }

  // Função chamada quando a data no ion-datetime muda
  handleDateChange(event: any) {
    // O valor do evento é a data selecionada em formato string ISO 8601
    this.dataSelecionada = event.detail.value;

    // Formata a data para uma exibição amigável
    this.formatarDataExibicao();
  }

  // Função auxiliar para formatar a data
  formatarDataExibicao() {
    if (this.dataSelecionada) {
      // Cria um objeto Date a partir da string ISO
      const dataObj = new Date(this.dataSelecionada);
      
      // Usa Intl.DateTimeFormat para formatação localizada
      this.dataExibicao = new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(dataObj);
    } else {
      this.dataExibicao = 'Nenhuma data selecionada';
    }
  }

}