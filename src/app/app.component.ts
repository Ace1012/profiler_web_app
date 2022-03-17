import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthServiceService } from './services/auth-service.service';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'tinka_profiler';
  currentRouter = '';
  routeSub;
  username='';
  reveal:boolean = false;
  activatedRoute="";
  
  constructor(private location:Location , private router:Router, private authService:AuthServiceService, private snackBar:MatSnackBar){
    this.routeSub = router.events.subscribe((val) => {
      if(val instanceof NavigationStart){
        // if(authService.isLoggedIn() == false){
        //   console.log("Not logged in!")
        //   authService.logout();
        // }
        if(val.url != 'home'){
          this.revealButton();
        }
      }

      if(val instanceof NavigationEnd){
        this.currentRouter = val.url;
        if(val.url != '/'){
          this.username = authService.getUserName();
        }
      }
    })
  }
  ngOnInit(): void {
    this.revealButton();
  }

  activateRoute(activatedRoute: string) {
    this.activatedRoute = activatedRoute;
  }

  //Navigation functions
  goToUsers(){
    this.router.navigate(['/users']);
  }

  goToOrgs(){
    this.router.navigate(['/organizations']);
  }

  revealButton(){
    let role = localStorage.getItem('current-user-role')
    // console.log(`Role is ${role}`)
    if(role == 'admin'){
      this.reveal = true;
    }else{
      this.reveal = false;
    }
  }

  goBack() {
    this.location.back();
  }

  backToLogin(){
    this.openSnackBar('Logged out!')
    this.authService.logout();

    this.router.navigate(['']);
    localStorage.removeItem('token')
    localStorage.removeItem('current-user-role')
    
  }

  goToHome(){
    this.router.navigate(['home']);
  }

  openSnackBar(message:string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000,
      data: message,
      panelClass:['red-snackbar']
    });
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

}
