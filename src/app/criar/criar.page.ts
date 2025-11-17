import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonInput, IonInputPasswordToggle, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-criar',
  templateUrl: './criar.page.html',
  styleUrls: ['./criar.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton, IonInput, IonInputPasswordToggle, RouterModule, IonGrid, IonRow, IonCol]
})
export class CriarPage implements OnInit {

  constructor() { }

  public nome: string = '';
  public sobrenome: string = '';
  public email: string = '';
  public senha: string = '';
  public senhacom: string = '';
  public emailrec: string = '';
  
  ngOnInit() {
  }

}
