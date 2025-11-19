import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol, IonButton, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.page.html',
  styleUrls: ['./inicial.page.scss'],
  standalone: true,
  imports: [IonContent, IonGrid, IonRow, IonCol, IonButton, IonLabel, CommonModule, FormsModule]
})
export class InicialPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
