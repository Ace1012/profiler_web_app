import { CanActivate, CanLoad, Router} from "@angular/router";
import { AuthServiceService } from "../services/auth-service.service";

export class LoginGuard implements CanLoad{

    constructor(private authService:AuthServiceService, private router:Router){}

    canLoad() {
        if(this.authService.isLoggedIn()){
            this.router.navigate(['home'])
            return false;
        }else{
            return true
        }
    }

}