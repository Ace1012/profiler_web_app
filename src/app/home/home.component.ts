import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  constructor(private router:Router) {}

  // hide:boolean = false;

  // ngOnInit(): void {
  //   this.hideButton();
  // }

  goToUsers(){
    this.router.navigate(['/users']);
  }

  // hideButton(){
  //   let role = localStorage.getItem('current-user-role')
  //   if(role == 'admin'){
  //     this.hide = true;
  //   }
  // }
}
