import { HttpClient } from "@angular/common/http";
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { StateService } from "../services/state.service";

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  constructor(private http: HttpClient, private router: Router, private toastCtrl: ToastController, private state: StateService) { }

  public auth(login: string, password: string) {
    this.http.get<{ login: string, password: string }>('./assets/auth.json').subscribe((resp) => {
      if ((login == resp.login) && (password == resp.password)) {
        this.state.logged = true;
        this.router.navigate(['home'])
      } else {
        this.state.logged = false;
        this.toast();
      }
    })
  }

  private async toast() {
    const toast = await this.toastCtrl.create({
      message: 'Не верная пара логин/пароль',
      duration: 2000,
      color: "danger"
    });
    toast.present();
  }
}
