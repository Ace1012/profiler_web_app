import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { deleteUser } from '../models/deleteUser';
import { UserServicesService } from '../services/user-services.service';
import { User } from '../models/user';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private userService:UserServicesService,
    private snackBar:MatSnackBar
  ){
    this.deleteUser = user;
  }

  ngOnInit(): void {
    console.log(User);
  }

  openSnackBar(message:string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000,
      data: message
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  callDelete(){
    this.userService.deleteUser(this.deleteUser).subscribe(result=>{
      console.log(result);
    })
    this.dialogRef.close();
    this.openSnackBar("Deleted Successfully")
  }

}
