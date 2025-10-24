import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonInput, IonInputPasswordToggle} from '@ionic/angular/standalone';


@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.page.html',
  styleUrls: ['./entrar.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton, IonInput, IonInputPasswordToggle]
})
export class EntrarPage implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
