import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup!:FormGroup;

  constructor(private authService: AuthServiceService, private router:Router, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.initForm();
  }

  openSnackBar(message:string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000,
      data: message
    });
  }

  initForm(){
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  loginProcess(){
    if(this.formGroup.valid){
      this.authService.login(this.formGroup.value).subscribe(result=>{
        if(result.token.body.success){
          let token:string = result.token.body.JSON;
          // console.log(token);
          let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
          // console.log(decodedJWT.role);

          let username = decodedJWT.sub;
          let role = decodedJWT.role;
          localStorage.setItem(`current-user-role`, role);
          localStorage.setItem('token', token);
          
          // console.log(result);
          // alert(result.token.body.message);
          this.openSnackBar(result.token.body.message);
          this.router.navigate(['/home']);
        }else{
          alert("Wrong credentials!");
        }
      })
    }
  }
}
