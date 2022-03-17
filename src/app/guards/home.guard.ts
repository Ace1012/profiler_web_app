import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CanActivate, CanLoad, Router } from "@angular/router";
import { lastValueFrom} from "rxjs";
import { AuthServiceService } from "../services/auth-service.service";
import { UserServicesService } from "../services/user-services.service";
import { SnackBarComponent } from "../snack-bar/snack-bar.component";

@Injectable({
    providedIn:'root'
})

export class HomeGuard implements CanLoad{
    roleDB!:string;

    constructor(private userService:UserServicesService , private authService:AuthServiceService, private router:Router, private snackBar:MatSnackBar){}

    async getRole(){
        await lastValueFrom(this.userService.getUserRole()).then((data)=>{
            this.roleDB = data.roleName;
        })
    }

    async canLoad(){
        let role:string = this.authService.getRole();
        await this.getRole();
        
        let loggedIn = this.authService.isLoggedIn();

        if(role == this.roleDB){
            console.log("They are equal!")
        }

        if(this.authService.isLoggedIn() && role == this.roleDB && role == 'admin' || 'user' || 'customer'){
            localStorage.setItem('current-user-role', role);
            return true;
        }
        if(loggedIn == false || role == null){
            this.openSnackBar("Please log in!")
            this.router.navigate(['']);
        }else{
            this.openSnackBar("Unauthorized!")
            this.router.navigate(['home']);
        }
        
        return (this.authService.isLoggedIn() && role == 'admin');
    }

    openSnackBar(message:string) {
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 2000,
          data: message,
          panelClass:['red-snackbar']
        });
      }
}