import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { addUser } from '../models/addUser';
import { UserServicesService } from '../services/user-services.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {

  statusId:number = 1 | 2;
  selectedStatus!:String;

  statuses: string[] = ['Activate/Enable account', 'Disable account'];

  roleId:number = 1 | 2 | 3;
  selectedRole!:String;

  roles: String[] = ['User', 'Customer'];

  address!:string;

  user:addUser={
    userName:'',
    userFirstName:'',
    userMiddleName:'',
    userLastName:'',
    userPassword:'',
    userStatusId:0,
  };

  constructor(private userServices:UserServicesService) { }

  ngOnInit(): void {
    console.log(this.roleId);
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

  callAddUser(){
    if(this.user.userName == '' || 
      this.user.userFirstName == '' ||
      this.user.userMiddleName == '' ||
      this.user.userLastName == ''){
        alert("User Details incomplete!")
      }

      if(this.user.userPassword == ''){
        alert("Enter user password!")
      }

      if(this.user.userStatusId == 0){
        alert("Assign the user an account status!")
      }

      if(this.roleId == 0){
        alert("Choose a role!")
      }

      if(this.address == ''){
        alert("Enter an address")
      }

      if(!(this.user.userName == '') && !(this.user.userFirstName == '') && !(this.user.userMiddleName == '') && !(this.user.userLastName == '')
        && !(this.user.userPassword == '') && this.user.userStatusId == 1 || 2, this.roleId == 1 || 2 || 3, !(this.address == '')){

          this.userServices.addUser(this.user, this.roleId, this.address).subscribe(result=>{
            console.log(result)
          })

        }
  }

}
