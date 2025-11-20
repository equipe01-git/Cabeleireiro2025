import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import {
  IonButtons, IonTitle, IonBackButton, IonHeader, IonContent,
  IonToolbar, IonItem, IonCard, IonCardTitle, IonCardHeader,
  IonCardContent, IonList, IonLabel, IonIcon
} from '@ionic/angular/standalone';

import { auth, db } from '../../firebase-config';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    IonTitle, IonHeader, IonContent, IonToolbar,IonButtons, IonBackButton,
    IonItem, IonCard, IonCardTitle, IonCardHeader, IonCardContent,
    IonList, IonLabel, IonIcon, CommonModule, FormsModule
  ]
})
export class PerfilPage implements OnInit {
  user: any = null;
  loading: boolean = true;

  fotoPerfil: string | null = null;

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    const fotoSalva = localStorage.getItem('fotoPerfil');
    if (fotoSalva) this.fotoPerfil = fotoSalva;

    onAuthStateChanged(auth, async (currentUser: User | null) => {
      if (!currentUser) {
        this.user = null;
        this.loading = false;
        return;
      }
      await this.loadUserData(currentUser.uid);
    });
  }

  async loadUserData(uid: string) {
    this.loading = true;
    try {
      const docRef = doc(db, 'users', uid);
      const snap = await getDoc(docRef);

      let data: any = null;

      if (snap.exists()) {
        data = snap.data();
      } else {
        const collRef = collection(db, 'users');
        const q = query(collRef, where('uid', '==', uid));
        const snapQ = await getDocs(q);
        if (!snapQ.empty) data = snapQ.docs[0].data();
      }

      if (!data) {
        const cu = auth.currentUser;
        this.user = cu ? {
          name: cu.displayName ?? cu.email?.split('@')[0] ?? 'Usuário',
          email: cu.email
        } : null;

        this.loading = false;
        return;
      }

      const email = data.email ?? auth.currentUser?.email ?? null;

      this.user = {
        ...data,
        nome: data.nome ?? data.name ?? '',
        sobrenome: data.sobrenome ?? '',
        nomeCompleto: `${data.nome ?? data.name ?? ''} ${data.sobrenome ?? ''}`.trim(),
        email: email || auth.currentUser?.email || ''
      };

    } catch (err) {
      console.error('Erro ao carregar usuário:', err);
      this.user = null;
    } finally {
      this.loading = false;
    }
  }

  selecionarFoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.fotoPerfil = reader.result as string;
        localStorage.setItem('fotoPerfil', this.fotoPerfil!);
      };

      reader.readAsDataURL(file);
    };

    input.click();
  }

  goBack() {
    this.navCtrl.back();
  }
}
