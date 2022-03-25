import {Component,OnInit, Inject} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { updateUser } from '../models/updateUser';
import { User } from '../models/user';
import { UserServicesService } from '../services/user-services.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.css']
})
export class UpdateUserDialogComponent implements OnInit {

  user!:User;
  statusOptions!:string[]

  username!:string;

  checked = false;
  enabled = "Disabled"

  updateUser:updateUser = {
    userId:0,
    userName: '',
    userStatusId:2
  };

  constructor(
    public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {user:User, statuses:string[]},
    private userService:UserServicesService,
    private snackBar:MatSnackBar
  ) {
    console.log(data);
    this.user = data.user
    this.statusOptions = data.statuses
    this.updateUser.userName = this.user.username
    console.log(this.statusOptions)
  }

  openSnackBar(message:string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000,
      data: message,
      panelClass:['purple-snackbar']
    });
  }

  onToggle(){
    this.checked = !this.checked;
    if(this.checked){
      this.enabled = "Enabled"
    }else{
      this.enabled = "Disabled"
    }
    this.updateUser.userStatusId = (this.statusOptions.indexOf(this.enabled) + 1)
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
      this.username = updateUser.userName
      console.log(result);
      this.openSnackBar(`Successfully ${this.enabled.toLowerCase()} ${this.username}`)
    })
  }
}
