import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddOrganization } from '../models/addOrganization';
import { OrgServicesService } from '../services/org-services.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-add-organization-dialog',
  templateUrl: './add-organization-dialog.component.html',
  styleUrls: ['./add-organization-dialog.component.css']
})
export class AddOrganizationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddOrganizationDialogComponent>,
    private orgService:OrgServicesService,
    private snackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  openSnackBar(message:string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000,
      data: message
    });
  }

  createOrganization(orgName:string, orgMobile:string, orgPostal:string, orgAddress:string){

    orgMobile = `+254` + orgMobile.slice(1);
    console.log(orgMobile)

    let organization:AddOrganization = {
      organizationName: orgName,
      organizationMobile: orgMobile,
      organizationPostal: orgPostal
    }
    this.orgService.addOrg(organization, orgAddress).subscribe(result=>{
      console.log(result);
    })
    this.openSnackBar("Organization added successfully!")
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
