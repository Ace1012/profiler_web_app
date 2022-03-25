import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CanActivate, CanLoad, Router } from "@angular/router";
import { EMPTY, lastValueFrom} from "rxjs";
import { AuthServiceService } from "../services/auth-service.service";
import { UserServicesService } from "../services/user-services.service";
import { SnackBarComponent } from "../snack-bar/snack-bar.component";

@Injectable({
    providedIn:'root'
})

export class UsersGuard implements CanActivate{
    roleDB!:string;

    constructor(private userService:UserServicesService , private authService:AuthServiceService, private router:Router, private snackBar:MatSnackBar){}

    async getRole(){
        await lastValueFrom(this.userService.getUserRole()).then((data)=>{
            if(data != EMPTY){
                console.log(`This is the user's role`)
                console.log(data)
                this.roleDB = data.roleName;
            }
        },
        ()=>{
            // console.log("Empty returned!")
            this.authService.logout();
        }
        )
    }

    async canActivate(){
        let role:string = this.authService.getRole();
        await this.getRole();
        
        let loggedIn = this.authService.isLoggedIn();

        if(this.authService.isLoggedIn() && role == this.roleDB && role == 'admin'){
            console.log(`The user passed the users.guard with role: `)
            console.log(role);
            return true;
        }
        
        if(loggedIn == false || role == null){
            console.log("I'm not logged in!")
            this.openSnackBar("Please log in!")
            this.router.navigate(['']);
            return false;
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