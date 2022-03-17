import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { timestamp } from 'rxjs';
import { addUser } from '../models/addUser';
import { UserServicesService } from '../services/user-services.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {

  statusId!:number;
  selectedStatus!:String;

  statuses: string[] = [];
  roles: String[] = [];

  roleId!:number;
  selectedRole!:String;

  address!:string;

  now!: Date;

  user:addUser={
    userName:'',
    userFirstName:'',
    userMiddleName:'',
    userLastName:'',
    userPassword:'',
    userStatusId:0,
    userCreated: ''
  };

  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    private userServices:UserServicesService,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.now = new Date();
    this.user.userCreated = this.formatDate(this.now);
    console.log(this.formatDate(this.now))
    this.userServices.fetchAccountStatusOptions().subscribe(result=>{
      for(let i = 0; i < result.roles.length; i++){
        if(result.roles[i].roleName != 'admin'){
          this.roles.push(this.capitalize(result.roles[i].roleName))
        }
      }
      for(let i = 0; i < result.statuses.length; i++){
        if(result.statuses[i].statusName != 'deleted'){
          this.statuses.push(this.capitalize(result.statuses[i].statusName))
        }
      }
      console.log(this.roles)
    });
  }

  padTo2Digits(num:number) {
    return num.toString().padStart(2, '0');
  }

  formatDate(date:Date) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-')
      +
      'T'
       +
      [
        this.padTo2Digits(date.getHours()),
        this.padTo2Digits(date.getMinutes()),
        this.padTo2Digits(date.getSeconds()),
      ].join(':')
      // +
      // '.'
      // +
      // [
      //   this.padTo2Digits(date.getMilliseconds())
      // ].join()
      // +
      // 'Z'
    );
  }

  capitalize(roleName:string) {
    return roleName.charAt(0).toUpperCase() + roleName.slice(1);
  }

  step = 0;

  setStep(index: number) {
    if(this.step == 0){
      this.addUserDetails(
        (<HTMLInputElement>document.getElementById("username")).value,
        (<HTMLInputElement>document.getElementById("firstname")).value,
        (<HTMLInputElement>document.getElementById("middlename")).value,
        (<HTMLInputElement>document.getElementById("lastname")).value,
        );
        this.addAddress(
          (<HTMLInputElement>document.getElementById("address")).value,
        );
    }
    if(this.step == 1){
      this.addUserPassword(
        (<HTMLInputElement>document.getElementById("password")).value,
        (<HTMLInputElement>document.getElementById("confirmPassword")).value,
      );
    }
    this.step = index;
  }

  nextStep() {
    this.step++;
    console.log(this.user)
  }

  prevStep() {
    if(this.step > 0){
      this.step--;
    }
  }

  addStatus(status:String){
    this.statusId = ((this.statuses.findIndex(x => x === status)) + 1);
    this.user.userStatusId = this.statusId;
    console.log("This is the value " + this.statusId);
  }

  addRole(role:String){
    this.roleId = ((this.roles.findIndex(x => x === role)) + 2);
    console.log("This is the role ID " + this.roleId);
  }

  addAddress(address:string){
    this.address = address;
    console.log("This is the address " + this.address);
  }

  addUserDetails(username:String, firstname:String,
     middlename:String, lastname:String){

      this.user.userName = username;
      this.user.userFirstName = firstname;
      this.user.userMiddleName = middlename;
      this.user.userLastName = lastname;
      console.log(this.user);
  }

  addUserPassword(password:String, confirm:String){
    if((password === confirm)){
      this.user.userPassword = password;
      console.log(this.user);
    }else[
      alert("Passwords do not match!")
    ]
  }

  openSnackBar(message:string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000,
      data: message
    });
  }

  callAddUser(){
    if(this.user.userName == '' || 
      this.user.userFirstName == '' ||
      this.user.userMiddleName == '' ||
      this.user.userLastName == ''){
        this.openSnackBar("User Details incomplete!")
      }

      if(this.user.userPassword == ''){
        this.openSnackBar("Enter user password!")
      }

      if(this.user.userStatusId == 0){
        this.openSnackBar("Assign the user an account status!")
      }

      if(this.roleId == 0){
        this.openSnackBar("Choose a role!")
      }

      if(this.address == ''){
        this.openSnackBar("Enter an address")
      }

      if(!(this.user.userName == '') && !(this.user.userFirstName == '') && !(this.user.userMiddleName == '') && !(this.user.userLastName == '')
        && !(this.user.userPassword == '') && this.user.userStatusId == 1 || 2, this.roleId == 1 || 2 || 3, !(this.address == '')){
          console.log(this.user.userCreated)
          this.userServices.addUser(this.user, this.roleId, this.address).subscribe(result=>{
            console.log(result)
            this.dialogRef.close();
            this.openSnackBar("User added successfully!")
          })

        }
  }

}
