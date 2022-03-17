import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddOrganizationDialogComponent } from '../add-organization-dialog/add-organization-dialog.component';
import { Address } from '../models/address';
import { Organization } from '../models/organization';
import { Service } from '../models/service';
import { OrgServicesService } from '../services/org-services.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {

  constructor(private orgServices:OrgServicesService, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getOrgs();
  }

  organizations:Organization[] = [];
  addresses:Address[] = [];
  services:Service[] = [];

  openAddOrgDialog(): void {
    const dialogRef = this.dialog.open(AddOrganizationDialogComponent, {
      width: '500px',
      height:'400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Server response is " + result);
      this.getOrgs();
    });
  }

  getOrgs(){
    this.organizations = []
    this.orgServices.getAllOrgs().subscribe(result=>{
      console.log(result)
      for(let i = 0; i < result.length; i++){

        for(let j = 0; j < result[i].organizationServices.length; j++){
          if(result[i].organizationId == result[i].organizationServices[j].serviceOrganizationId){
            let service:Service ={
              serviceId: result[i].organizationServices[j].serviceId,
              serviceName: result[i].organizationServices[j].serviceName,
              serviceStart: result[i].organizationServices[j].serviceStart,
              serviceEnd:result[i].organizationServices[j].serviceEnd,
              serviceOrganizationId:result[i].organizationServices[j].serviceOrganizationId
            }
            this.services.push(service);
          }
        }

        for(let k = 0; k < result[i].addresses.length; k++){
          if(result[i].organizationId == result[i].addresses[k].addressOrgId){
            let address:Address = {
              addressId:result[i].addresses[k].addressId,
              addressValue:result[i].addresses[k].addressValue
            }
            this.addresses.push(address)
          }
        }

        let organization:Organization ={
          organizationId: result[i].organizationId,
          organizationName: result[i].organizationName,
          organizationMobile: result[i].organizationMobile,
          organizationPostal: result[i].organizationPostal,
          organizationServices: this.services,
          addresses:this.addresses
        }
        this.services = [];
        this.addresses = []
        this.organizations.push(organization);
      }
    })

    console.log(this.organizations);
  }

}
