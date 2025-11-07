import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonButtons, IonTitle, IonBackButton ,IonHeader, IonContent, IonToolbar, IonItem, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonList , IonLabel, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [IonButtons, IonTitle, IonBackButton ,IonHeader, IonContent, IonToolbar, IonItem, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonList , IonLabel, IonIcon]
})
export class ProfilePage implements OnInit {
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
