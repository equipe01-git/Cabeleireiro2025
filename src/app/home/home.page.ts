import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonTitle, IonHeader, IonContent, IonToolbar, IonIcon, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonTitle, IonHeader, IonContent, IonToolbar, IonIcon, IonButton]
})
export class HomePage {
  constructor(private navCtrl: NavController) {}

  navigateToProfile() {
    this.navCtrl.navigateForward('/profile');
  }

  navigateToSchedule() {
    this.navCtrl.navigateForward('/schedule');
  }

  navigateToServices() {
    this.navCtrl.navigateForward('/services');
  }

  navigateToAppointments() {
    this.navCtrl.navigateForward('/appointments');
  }
}
