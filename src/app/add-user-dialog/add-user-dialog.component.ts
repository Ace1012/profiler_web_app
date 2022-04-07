import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { timestamp } from 'rxjs';
import { addUser } from '../models/addUser';
import { Role } from '../models/role';
import { Status } from '../models/status';
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

  statusesObjects:Status[] = [];
  roleObjects:Role[] = [];

  roleId!:number;
  selectedRole!:String;

  address!:string;

  now!: Date;

  step = 0;

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
    let timestamp = this.now.getTime() - this.now.getTimezoneOffset() * 60000;
    this.now = new Date(timestamp)
    
    console.log(`Time is`)
    console.log(this.now.toISOString().substring(0,19))
    // console.log(this.formatDate(this.now))
    
    this.user.userCreated = this.formatDate(this.now);
    // this.user.userCreated = this.now.toISOString();
    // console.log(this.formatDate(this.now))

    this.userServices.fetchAccountStatusOptions().subscribe(result=>{
      console.log("This is the result")
      console.log(result)

      this.statusesObjects = result.statuses;
      this.roleObjects = result.roles;

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
        this.padTo2Digits(date.getHours() - 3),
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

  setStep(index: number) {

    if(index != 0 && this.step == 0){
      console.log(`step is 0!`)

        let username = (<HTMLInputElement>document.getElementById("username")).value
        let firstname = (<HTMLInputElement>document.getElementById("firstname")).value
        let middlename = (<HTMLInputElement>document.getElementById("middlename")).value
        let lastname = (<HTMLInputElement>document.getElementById("lastname")).value
        let address = (<HTMLInputElement>document.getElementById("address")).value

      if(username.length == 0 || firstname.length == 0 || middlename.length == 0 || lastname.length == 0 || address.length == 0){

        this.openSnackBar('User details incomplete')

      }else{

        this.addUserDetails( username, firstname, middlename, lastname);
        this.addAddress(address);  
      }
    }

    if(index != 1 && this.step == 1){
      console.log(`step is 1!`)
      
      let password = (<HTMLInputElement>document.getElementById("password")).value
      let confirmPassword = (<HTMLInputElement>document.getElementById("confirmPassword")).value

      if(password != null && confirmPassword != null && password == confirmPassword){
        this.addUserPassword(password, confirmPassword, null)
      }

      if(password != null && confirmPassword != null){
        this.openSnackBar('Password details incomplete!')
      }

      if(password != confirmPassword){
        this.openSnackBar(`Password details don't match!`)
        console.log(`Password details don't match!`)
      }
    }
    this.step = index;
    console.log(`step is:`)
    console.log(this.step)
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

  addUserDetails(username:String, firstname:String,
    middlename:String, lastname:String){

     this.user.userName = username;
     this.user.userFirstName = firstname;
     this.user.userMiddleName = middlename;
     this.user.userLastName = lastname;

     this.nextStep()

     console.log(this.user);
  }

  addUserPassword(password:String, confirm:String, direction:number | null){
    if((password === confirm)){
      this.user.userPassword = password;
      console.log(this.user);

      if(direction == 0){
        this.prevStep()
      }
      if(direction == 1){
        this.nextStep()
      }

    }else{
      this.openSnackBar("Passwords do not match!")
    }
  }

  addStatus(status:String){
    for(let statusObject of this.statusesObjects){
      if(statusObject.statusName == status.toLowerCase()){
        this.statusId = statusObject.statusId;
        this.user.userStatusId = this.statusId;
        console.log(`This is the status id ${this.statusId}`)
        break;
      }
    }
  }

  addRole(role:String){
    for(let roleObject of this.roleObjects){
      if(roleObject.roleName == role.toLowerCase()){
        this.roleId = roleObject.roleId;
        console.log(`This is the role id ${this.roleId}`)
        break;
      }
    }
  }

  addAddress(address:string){
    this.address = address;
    console.log("This is the address " + this.address);
  }

  openSnackBar(message:string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000,
      data: message
    });
  }

  callAddUser(){

      let username = (<HTMLInputElement>document.getElementById("username")).value
      let firstname = (<HTMLInputElement>document.getElementById("firstname")).value
      let middlename = (<HTMLInputElement>document.getElementById("middlename")).value
      let lastname = (<HTMLInputElement>document.getElementById("lastname")).value
      let address = (<HTMLInputElement>document.getElementById("address")).value
      let password = (<HTMLInputElement>document.getElementById("password")).value
      let confirmPassword = (<HTMLInputElement>document.getElementById("confirmPassword")).value

      if(
        this.user.userName == '' || 
        this.user.userFirstName == '' ||
        this.user.userMiddleName == '' ||
        this.user.userLastName == ''){
        this.openSnackBar("User Details incomplete!")
      }

      // if(this.user.userPassword == ''){
      //   this.openSnackBar("Enter user password!")
      // }

      // if(this.user.userStatusId == 0){
      //   this.openSnackBar("Assign the user an account status!")
      // }

      // if(this.roleId == 0){
      //   this.openSnackBar("Choose a role!")
      // }

      // if(this.address == ''){
      //   this.openSnackBar("Enter an address")
      // }

      if(this.user.userName != '' && this.user.userFirstName != '' && this.user.userMiddleName != '' && this.user.userLastName != ''
        && this.user.userPassword != '' && this.user.userStatusId != null, this.roleId != null, this.address != ''){
          
          this.userServices.addUser(this.user, this.roleId, this.address).subscribe(result=>{
            console.log(result)
            this.dialogRef.close();
            this.openSnackBar("User added successfully!")
          })

        }
  }

}
