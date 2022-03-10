import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tinka_profiler';
  
  constructor(private router:Router){}

  backToLogin(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
    alert("You must login again");
  }

}
