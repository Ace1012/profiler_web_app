import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { Organization } from '../models/organization';
import { ServiceModel } from '../models/service-display';
import { Status } from '../models/status';
import { UpdateService } from '../models/updateService';
import { OrgServicesService } from '../services/org-services.service';
import { ServicesService } from '../services/services.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service-dialog.component.html',
  styleUrls: ['./update-service-dialog.component.css']
})
export class UpdateServiceDialogComponent implements OnInit {

  oldService!:ServiceModel;

  statuses:Status[] = [];
  orgs:Organization[] = [];

  updateService:UpdateService = {
    serviceId:0,
    serviceName:'',
    serviceOrganizationId:0,
    serviceStatus:0
  }

  checked = false;
  enabled = "Disabled"

  constructor(
    public dialogRef:  MatDialogRef<UpdateServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _service: ServiceModel,
    private serviceServices:ServicesService,
    private orgServices:OrgServicesService,
    private snackBar:MatSnackBar  
    ) {
      this.oldService = _service;
      this.updateService.serviceId = this.oldService.serviceId
      this.updateService.serviceName = this.oldService.serviceName
      
      if(this.oldService.organization != null){
        this.updateService.serviceOrganizationId  = this.oldService.organization?.organizationId
      }else{
        this.updateService.serviceOrganizationId = this.oldService.serviceOrganizationId
      }

      let statusId = this.oldService.serviceStatus

      this.updateService.serviceStatus = statusId

      if(statusId == 1){
        this.enabled = "Enabled"
        this.checked = true
      }else{
        this.enabled = "Disabled"
        this.checked = false
      }
     }

  ngOnInit(): void {
    this.getStatuses();
    this.getOrgs();
  }

  openSnackBar(message:string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000,
      data: message,
      panelClass:['purple-snackbar']
    });
  }

  async getStatuses(){
    await lastValueFrom(this.serviceServices.getStatuses()).then((statusList)=>{
      this.statuses = statusList
    })
  }

  async getOrgs(){
    await lastValueFrom(this.orgServices.getAllOrgs()).then((orgList)=>{
      this.orgs = orgList;
    })
  }

  onToggle(){
    this.checked = !this.checked;
    if(this.checked){
      this.enabled = "Enabled"
    }else{
      this.enabled = "Disabled"
    }
    this.addStatus(this.enabled)
    console.log(`Status is ${this.updateService.serviceStatus}`)
  }

  addStatus(status:String){
    for(let statusObject of this.statuses){
      if(statusObject.statusName == status.toLowerCase()){
        this.updateService.serviceStatus = statusObject.statusId;
        console.log(`This is the status id ${this.updateService.serviceStatus}`)
        break;
      }
    }
  }

  addOrg(orgName:String){
    for(let org of this.orgs){
      if(org.organizationName == orgName){
        this.updateService.serviceOrganizationId = org.organizationId;
        console.log(`This is the org id ${this.updateService.serviceOrganizationId}`)
        break;
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  callUpdate(updateService:UpdateService){
    this.serviceServices.updateService(updateService).subscribe(result=>{
      console.log(result);
      // this.openSnackBar(`Successfully updated ${this.service.serviceName} details to ${updateService.serviceName}`)
      this.openSnackBar(`Successfully updated "${updateService.serviceName}"`)
    })
  }

}
