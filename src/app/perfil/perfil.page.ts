import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController} from '@ionic/angular'
import { IonButtons, IonTitle, IonBackButton ,IonHeader, IonContent, IonToolbar, IonItem, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonList , IonLabel, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonButtons, IonTitle, IonBackButton ,IonHeader, IonContent, IonToolbar, IonItem, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonList , IonLabel, IonIcon]
})
export class PerfilPage implements OnInit {
  user: any;

  constructor(
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }
}