import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { User } from './models/user';
import { AuthServiceService } from './services/auth-service.service';
import { UserServicesService } from './services/user-services.service';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'tinka_profiler';
  currentRouter:string = '/';
  routeSub;
  username='';
  reveal:boolean = false;
  activatedRoute="";
  time!: number;
  user:User={
    userid: 0,
    username: '',
    firstname: '',
    middlename: '',
    lastname: '',
    dateCreated: '',
    status: '',
    addresses: [],
    contacts: []
  };
  
  constructor(private userService:UserServicesService , private router:Router, private authService:AuthServiceService, private snackBar:MatSnackBar){
    this.routeSub = router.events.subscribe((val) => {

      if(val instanceof NavigationStart){
        if(val.url != 'home'){
          this.revealButton();
        }
      }

      if(val instanceof NavigationEnd){

        // console.log(`Current`)
        // console.log(this.currentRouter)

        // console.log(`\n\n`)

        // console.log(`Destination`)
        // console.log(val.url)

        // console.log(`\n\n`)

        // console.log(`Logged in is`)
        // console.log(authService.isLoggedIn())

        if(val.url != '/'){
          if(authService.isLoggedIn()){
            console.log(`I made it!`)
            this.username = this.authService.getUserName();
          }
          // this.checkIdle();
        }

        if(this.currentRouter == '/' && val.url == '/home' && authService.isLoggedIn()){
          this.getUserProfile()
        }
        this.currentRouter = val.url;
      }
    })
  }
  ngOnInit(): void {
    this.revealButton();
    // this.getUserProfile()
    // this.checkIdle();
  }

  async getUserProfile(){
    console.log(`Helloooooooooo`)
    await lastValueFrom(this.userService.fetchUser(this.username)).then((fetchedUser)=>{
      console.log(`Fetched user is: `)
      console.log(fetchedUser)
      this.user = fetchedUser as User
      
    })
  }

  activateRoute(activatedRoute: string) {
    this.activatedRoute = activatedRoute;
  }

  //Navigation functions START
  goToUsers(){
    this.router.navigate(['/users']);
  }

  goToOrgs(){
    this.router.navigate(['/organizations']);
  }

  goToServices(){
    this.router.navigate(['services']);
  }

  goToCustomers(){
    this.router.navigate(['customers']);
  }
  //Navigation functions END

  async revealButton(){
    // let role = localStorage.getItem('current-user-role')
    let roleDB;
    await this.userService.getUserRole().subscribe(result=>{
      roleDB = result.roleName

      if(roleDB == 'admin'){
        this.reveal = true;
      }else{
        this.reveal = false;
      }
    });
    // console.log(`Role is ${role}`)
  }

  backToLogin(){
    this.openSnackBar('Logged out!')
    this.authService.logout();
    this.router.navigate(['']);
    localStorage.removeItem('token')
    localStorage.removeItem('current-user-role')
  }

  idleBackToLogin(){
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

  // @HostListener('document:mousemove')
  // @HostListener('document:keypress')
  // @HostListener('document:click')
  // @HostListener('document:wheel')
  // checkIdle() {
  //   if(this.authService.isLoggedIn()){
  //     clearTimeout(this.time);
  //   this.time = window.setTimeout(() => {
  //     this.openSnackBar("Logged out due to inactivity!")
  //     this.idleBackToLogin()
  //   }, 600000);
  //   }
  // }

  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

}
