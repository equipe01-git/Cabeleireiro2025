import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonBackButton, IonButtons, IonToolbar, IonTitle, IonContent, IonModal, IonButton, IonInput, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';

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
    IonInput,
    IonGrid,
    IonRow,
    IonCol
  ],
})
export class CalendarioComponent implements OnInit {

  public dia: string ='';
  public mes: string ='';
  public ano: string ='';
  public corte: string ='';

  constructor() { }

  ngOnInit() {
  }

}

