import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Address } from '../models/address';
import { Contact } from '../models/contact';
import { User } from '../models/user';

@Component({
  selector: 'app-user-more-details',
  templateUrl: './user-more-details.component.html',
  styleUrls: ['./user-more-details.component.css']
})
export class UserMoreDetailsComponent implements OnInit {

  user!:User;
  addresses:Address[] = [];
  contacts:Contact[] = [];

  constructor(@Inject (MAT_BOTTOM_SHEET_DATA) private userDetails:User) {
    this.user = userDetails;
   }

  ngOnInit(): void {

    this.addresses = this.user.addresses;
    this.contacts = this.user.contacts;

  }

}
