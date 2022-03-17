import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AuthServiceService } from "../services/auth-service.service";
import { SnackBarComponent } from "../snack-bar/snack-bar.component";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor{

    token;

    constructor(private authService:AuthServiceService, private snackBar:MatSnackBar, private router:Router){
        this.token = authService.getToken();
        
    }

    openSnackBar(message:string) {
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 2000,
          data: message,
          panelClass:['purple-snackbar']
        });
      }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.token = this.authService.getToken();

        let headers;

        if(this.token!=null){
            headers = {
                'Content-Type':  'application/json',
                Authorization: `Bearer ${this.token}`
            }
        }else{
            headers = {
                'Content-Type':  'application/json',
            }
        }

        const reqWithAuth = req.clone({
            setHeaders:headers
        });

        return next.handle(reqWithAuth)
        .pipe(
            catchError((error: HttpErrorResponse)=>{
                if(error.status == 401){
                    this.handleAuthError();
                    console.log("The error is:")
                    // console.log(`${error.error.message}`
                    let errorMessage = error.error.message ? error.error.message : 'Unauthorized';
                    this.openSnackBar(errorMessage)
                    return throwError(() => error);
                }

                if(error.status == 500){
                    this.openSnackBar(`${error.error.message}`)
                    return throwError(() => error)
                }

                if(error.status == 0){
                    this.handleAuthError();
                    this.openSnackBar(`Host unreachable`);
                    return throwError(() => error);
                }

                if(error == null){
                    this.openSnackBar(`Waiting...`);
                    return throwError(() => error);
                }

                return throwError(() => error);
            })
        )
    }

    private handleAuthError() {
        if(this.authService.isLoggedIn()){
            this.authService.logout();
            localStorage.removeItem('token');
            localStorage.removeItem('current-user-role');
            this.router.navigateByUrl('');
        }
        this.router.navigateByUrl('');
      }
    
}