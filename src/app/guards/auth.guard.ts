import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CanActivate, CanLoad, Router } from "@angular/router";
import { AuthServiceService } from "../services/auth-service.service";
import { SnackBarComponent } from "../snack-bar/snack-bar.component";

@Injectable({
    providedIn:'root'
})

export class AuthGuard implements CanActivate{

    constructor(private authService:AuthServiceService, private router:Router, private snackBar:MatSnackBar){}

    canActivate() {
        if(this.authService.isLoggedIn()){
            return this.authService.isLoggedIn();
        }
        else{
            this.openSnackBar("Please log in!")
            this.router.navigate(['']);
            return !this.authService.isLoggedIn();
        }
    }

    openSnackBar(message:string) {
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 2000,
          data: message,
          panelClass:['red-snackbar']
        });
      }

}