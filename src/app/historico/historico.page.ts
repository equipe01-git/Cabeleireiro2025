import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon, IonFooter, IonTabs, IonTabBar, IonTabButton, IonBackButton, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonNote } from '@ionic/angular/standalone';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
  standalone: true,
  imports: [IonNote, IonLabel, IonItem, IonAccordion, IonAccordionGroup, IonBackButton, IonTabButton, IonTabBar, IonFooter, IonIcon, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HistoricoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
