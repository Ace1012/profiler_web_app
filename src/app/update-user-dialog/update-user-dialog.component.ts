import {Component,OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { updateUser } from '../models/updateUser';
import { user } from '../models/user';
import { UserServicesService } from '../services/user-services.service';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.css']
})
export class UpdateUserDialogComponent implements OnInit {

  user!:user;

  updateUser:updateUser = {
    userId:0,
    userName: '',
    userPassword:''
  };

  constructor(
    public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userDetails: user,
    private userService:UserServicesService
  ) {
    // console.log(userDetails);
    this.user = userDetails;
    console.log(this.user);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.updateUser.userId = this.user.userid;
    console.log(this.user);
  }

  callUpdate(updateUser:updateUser){
    this.userService.updateUser(updateUser).subscribe(result=>{
      console.log(result);
    })
  }
}
