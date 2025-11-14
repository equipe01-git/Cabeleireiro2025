import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonTitle, IonHeader, IonContent, IonToolbar, IonIcon, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-provedor',
  templateUrl: './provedor.page.html',
  styleUrls: ['./provedor.page.scss'],
  imports: [IonTitle, RouterLink, IonHeader, IonContent, IonToolbar, IonIcon, IonButton]
})
export class ProvedorPage {
  constructor() {}
}
