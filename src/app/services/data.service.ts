import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private contacts: Contact[];

  private lastId: number = 20;

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    if (this.contacts) {
      return of(this.contacts);
    } else {
      return this.http.get<Contact[]>('./assets/contacts.json')
        .pipe(tap(contacts => this.contacts = contacts));
    }
  }

  getContactsByCategory(category: string): Observable<Contact[]> {
    return this.getContacts().pipe(map(contacts => contacts.filter(contact => contact.category == category)));
  }

  getContactById(id: number): Observable<Contact> {
    return this.getContacts().pipe(map(contacts => contacts.find(contact => contact.id == id)));
  }

  createContact(contact: Contact) {
    contact.id = this.lastId + 1;
    this.lastId = this.lastId + 1;
    this.contacts.push(contact);
  }

  updateContact(contact: Contact): Contact {
    let itemIndex = this.contacts.findIndex(item => item.id == contact.id);
    this.contacts[itemIndex] = contact;
    return contact;
  }

  deleteContact(id: number): Contact {
    let itemIndex = this.contacts.findIndex(item => item.id == id);
    return this.contacts.splice(itemIndex, 1)[0];
  }
}
