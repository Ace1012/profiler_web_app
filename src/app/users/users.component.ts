import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../services/user-services.service';
import { User } from '../models/user';
import {MatDialog} from '@angular/material/dialog';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';
import { deleteUser } from '../models/deleteUser';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { Address } from '../models/address';
import { contact } from '../models/contact';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UserMoreDetailsComponent } from '../user-more-details/user-more-details.component';
import * as moment from 'moment';
import { rowsAnimation } from '../rows-animation';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [rowsAnimation]
})


export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'USERNAME', 'FIRSTNAME', 'MIDDLENAME', 'LASTNAME', 'DATE-CREATED' , 'USER-STATUS', 'USER-OPERATIONS'];

  user!:User;
  users:User[]=[];
  addresses:Address[] = [];
  contacts:contact[] = [];

  statuses: string[] = [];
  roles: String[] = [];

  dataSource!: User[] | MatTableDataSource<User>;

  username!:String;

  constructor(private userService:UserServicesService, public dialog: MatDialog, private moreDetails:MatBottomSheet) { }

  ngOnInit(): void {
    this.displayUsers();
    this.userService.fetchAccountStatusOptions().subscribe(result=>{
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
    this.dataSource = new MatTableDataSource(this.users);
  }

  capitalize(roleName:string) {
    return roleName.charAt(0).toUpperCase() + roleName.slice(1);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayUsers(){
    this.users = [];
    this.userService.getAllUsers().subscribe(result=>{

      for(let i = 0; i < result.length; i++){
        for(let j = 0; j < result[i].addresses.length; j++){

          let address:Address = {
            addressId:result[i].addresses[j].addressId,
            addressValue:result[i].addresses[j].addressValue
          }
          this.addresses.push(address);
        }

        for(let k = 0; k < result[i].contacts.length; k++){

          let contact:contact = {
            contactId:result[i].contacts[k].contactId,
            contactValue: result[i].contacts[k].contactValue
          }
          this.contacts.push(contact);
        }

        let myMoment: moment.Moment = moment(result[i].userCreated);
        
        let user:User = {
          userid:result[i].userId,
          username: result[i].userName,
          firstname: result[i].userFirstName,
          middlename: result[i].userMiddleName,
          lastname: result[i].userLastName,
          // dateCreated: myMoment.toString().substring(4,24),
          dateCreated: myMoment.toString(),
          status: result[i].statusBean.statusName,
          addresses: this.addresses,
          contacts: this.contacts,
        };
  
        this.users.push(user);

        this.addresses = [];
        this.contacts = [];

        this.dataSource = new MatTableDataSource(this.users);
      }
    });
  }

  clearUsers(){
    this.dataSource = [];
  }

  openUpdateDialog(user:User): void {
    console.log(`This is the user`)
    console.log(user)
    this.user = user;
    const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
      width: '500px',
      height:'fit-content',
      data: {user:this.user, statuses:this.statuses},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Server response is ")
      console.log(result)
      this.displayUsers();
    });
  }

  openAddDialog(){
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '1000px',
      height:'fit-content',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Server response is ")
      console.log(result)
      this.displayUsers();
    });
  }

  openDeleteDialog(user:User): void{
    let deleteUser:deleteUser = {
      userId:user.userid,
    };

    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '500px',
      height:'fit-content',
      data: deleteUser,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Server response is ")
      console.log(result)
      this.displayUsers();
    });
  }

  openBottomSheet(user:User): void {
    this.moreDetails.open(UserMoreDetailsComponent, {
      data: user
    });
  }

}



