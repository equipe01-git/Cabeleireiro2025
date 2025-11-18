import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonTitle, IonHeader, IonContent, IonToolbar, IonIcon, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonTitle, IonHeader, IonContent, IonToolbar, IonIcon, IonButton, RouterLink]
})
export class HomePage {

  public provedor: boolean = true;

  constructor() {}
}
