import { Component, Inject, OnInit } from '@angular/core';
import { UserServicesService } from '../services/user-services.service';
import { HttpClient, HttpResponse ,HttpHeaders} from '@angular/common/http';
import { user } from '../models/user';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';
import { deleteUser } from '../models/deleteUser';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})


export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'USERNAME', 'FIRSTNAME', 'MIDDLENAME', 'LASTNAME', 'USER-OPERATIONS'];

  users:user[]=[];
  dataSource!: user[] | MatTableDataSource<user>;

  username!:String;

  constructor(private userService:UserServicesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(localStorage.getItem("token"));
    this.displayUsers();
    this.dataSource = new MatTableDataSource(this.users);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayUsers(){
    this.users = [];
    this.userService.getAllUsers().subscribe(result=>{
      for(let i = 0; i < result.length; i++){

        let user:user = {
          userid:result[i].userId,
          username: result[i].userName,
          firstname: result[i].userFirstName,
          middlename: result[i].userMiddleName,
          lastname: result[i].userLastName,
        };
  
        this.users.push(user);
        this.dataSource = new MatTableDataSource(this.users);
      }
    });
  }

  clearUsers(){
    this.dataSource = [];
  }

  openUpdateDialog(user:user): void {
    const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
      width: '500px',
      height:'fit-content',
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Server response is " + result);
      this.displayUsers();
    });
  }

  openAddDialog(){
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '1000px',
      height:'fit-content'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Server response is " + result);
      this.displayUsers();
    });
  }

  openDeleteDialog(user:user): void{
    let deleteUser:deleteUser = {
      userId:user.userid,
    };

    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '500px',
      height:'fit-content',
      data: deleteUser,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Server response is " + result);
      this.displayUsers();
    });
  }
}



