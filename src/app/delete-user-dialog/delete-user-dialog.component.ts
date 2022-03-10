import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { deleteUser } from '../models/deleteUser';
import { UserServicesService } from '../services/user-services.service';
import { user } from '../models/user';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent implements OnInit {

  deleteUser!:deleteUser;

  constructor(
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: deleteUser,
    private userService:UserServicesService
  ){
    this.deleteUser = user;
  }

  ngOnInit(): void {
    console.log(user);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  callDelete(){
    this.userService.deleteUser(this.deleteUser).subscribe(result=>{
      console.log(result);
    })
    this.dialogRef.close();
  }

}
