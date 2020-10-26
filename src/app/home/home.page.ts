import { Component } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '../models/contact';
import { NewContactPage } from '../new-contact/new-contact.page';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public contacts: Observable<Contact[]>;
  public currentSegment: string = "All";

  constructor(
    private dataService: DataService,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {
    this.contacts = this.dataService.getContacts();
  }

  ionViewWillEnter() {
    this.loadContacts(this.currentSegment);
  }

  filterContacts(event: any) {
    let selectedCategory = event.detail.value;
    this.currentSegment = selectedCategory;

    this.loadContacts(selectedCategory);
  }

  loadContacts(category: string, searchStr: string = null) {
    if (category === 'All') {
      this.contacts = this.dataService.getContacts().pipe(map(contacts => contacts.filter(contact => contact.firstName.toLowerCase().includes(searchStr.toLowerCase()))));
    } else {
      this.contacts = this.dataService.getContactsByCategory(category).pipe(map(contacts => contacts.filter(contact => contact.firstName.toLowerCase().includes(searchStr.toLowerCase()))));;
    }
  }

  async openNewContactModal() {
    const modal = await this.modalController.create({
      component: NewContactPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });

    modal.onWillDismiss().then(() => {
      this.loadContacts(this.currentSegment);
    });

    return await modal.present();
  }

  public onSearchChange() {

  }
}
