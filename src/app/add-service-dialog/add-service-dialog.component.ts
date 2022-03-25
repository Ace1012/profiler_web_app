import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom, range } from 'rxjs';
import { Organization } from '../models/organization';
import { Status } from '../models/status';
import { OrgServicesService } from '../services/org-services.service';
import { ServicesService } from '../services/services.service';
import * as moment from 'moment';
import { DateAdapter } from '@angular/material/core';
import { AddService } from '../models/addService';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-service-dialog',
  templateUrl: './add-service-dialog.component.html',
  styleUrls: ['./add-service-dialog.component.css']
})
export class AddServiceDialogComponent implements OnInit {

  statuses:Status[] = [];
  statusObjects:Status[] = [];
  orgs:Organization[] = [];

  chosenDate!:Date;

  addService:AddService = {
    serviceName:'',
    serviceStart:'',
    serviceEnd:'',
    serviceOrganizationId:0,
    serviceStatus:0
  }

  // range = new FormGroup({
  //   start: new FormControl(),
  //   end: new FormControl(),
  // })

  startDate:string = "...";
  endDate:string = "...";

  constructor(
    public dialogRef:MatDialogRef<AddServiceDialogComponent>,
    private serviceServices:ServicesService,
    private orgServices:OrgServicesService,
    private snackBar:MatSnackBar
    // @Inject(MAT_DIALOG_DATA) public _service: ServiceModel,
  ) { }

  ngOnInit(): void {
    this.getStatuses()
    this.getOrgs()
  }

  callAddService(){
    if(
        this.addService.serviceName != '' &&
        this.addService.serviceStart != '' &&
        this.addService.serviceEnd != '' &&
        this.addService.serviceOrganizationId != 0 &&
        this.addService.serviceStatus != 0
      ){
      this.serviceServices.addService(this.addService).subscribe(result=>{
        console.log(result)
        this.openSnackBar(result.message)
        this.dialogRef.close()
      })
    }else{
      this.openSnackBar(`Complete service profile!`)
    }
  }

  addOrg(orgId:number){
    this.addService.serviceOrganizationId = orgId
    console.log(this.addService)
  }

  addStatus(statusId:number){
    this.addService.serviceStatus = statusId
    console.log(this.addService)
  }

  onDateChange(newdate:Date) {
    const myMoment = moment();
    const momentDate = moment(newdate).add({hours: myMoment.hour(), minutes:myMoment.minute() , seconds:myMoment.second()})
    this.chosenDate = momentDate.toDate();
    // console.log({hours: myMoment.hour(), minutes:myMoment.minute() , seconds:myMoment.second()})
    console.log(`Chosen Date is: `)
    console.log(this.chosenDate)
    console.log("\n\n")
  }

  getDateValues(date:Date){
    // console.log(this.formatDate(date))

    this.addService.serviceStart = this.formatDate(date)
    console.log(`Start date is:`)
    console.log(this.addService.serviceStart)
    console.log("\n\n")

    date.setDate(date.getDate() + 30)
    this.addService.serviceEnd = this.formatDate(date)
    console.log(`End date is:`)
    console.log(this.addService.serviceEnd)
    console.log("\n\n")

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
        this.padTo2Digits(date.getHours()),
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

  async getStatuses(){
    await lastValueFrom(this.serviceServices.getStatuses()).then((statusList)=>{
      this.statusObjects = statusList

      for(let i = 0; i < this.statusObjects.length; i++){
        if(this.statusObjects[i].statusName == 'enabled' || this.statusObjects[i].statusName == 'disabled'){
          this.statusObjects[i].statusName = this.capitalize(this.statusObjects[i].statusName)
          this.statuses.push(this.statusObjects[i])
        }
      }
      console.log(this.statuses)
    })
  }

  async getOrgs(){
    await lastValueFrom(this.orgServices.getAllOrgs()).then((orgList)=>{
      this.orgs = orgList;
    })
  }

  capitalize(name:string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message:string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000,
      data: message,
      panelClass:['purple-snackbar']
    });
  }

}
