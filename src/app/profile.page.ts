import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;

  constructor(
    private navCtrl: NavController,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  goBack() {
    this.navCtrl.back();
  }
}
