import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonTitle, IonHeader, IonContent, IonToolbar, IonIcon, IonButton, IonItem, IonLabel, IonAccordion, IonAccordionGroup } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './homebarbeiro.page.html',
  styleUrls: ['./homebarbeiro.page.scss'],
  imports: [IonTitle, IonHeader, IonContent, IonToolbar, IonButton, RouterLink, IonIcon, IonItem, IonLabel, IonAccordion, IonAccordionGroup]
})
export class HomebarbeiroPage {
  constructor() {}
}
