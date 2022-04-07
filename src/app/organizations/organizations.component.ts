import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddOrganizationDialogComponent } from '../add-organization-dialog/add-organization-dialog.component';
import { Address } from '../models/address';
import { Organization } from '../models/organization';
import { Service } from '../models/organization-service';
import { OrgServicesService } from '../services/org-services.service';
import { rowsAnimation } from '../rows-animation';
import { UserServicesService } from '../services/user-services.service';
import { lastValueFrom } from 'rxjs';
import { ServiceModel } from '../models/serviceModel';
import { UpdateServiceDialogComponent } from '../update-service-dialog/update-service-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css'],
  animations: [rowsAnimation]
})
export class OrganizationsComponent implements OnInit {

  roleDB!:string;

  organizations:Organization[] = [];
  addresses:Address[] = [];
  services:ServiceModel[] = [];

  dataSources!: MatTableDataSource<Organization>;

  constructor(
    private orgServices:OrgServicesService,
    private dialog:MatDialog,
    private userService:UserServicesService
     ) { }

  ngOnInit(): void {
    this.getOrgs();
    this.getDBRole()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSources.filter = filterValue.trim().toLowerCase();
    console.clear()
    console.log(`Datasource is`)
    console.log(this.dataSources)
  }

  async getDBRole(){
    await lastValueFrom(this.userService.getUserRole()).then((roleBean)=>{
        this.roleDB = roleBean.roleName;
        console.log("This is the role: ")
        console.log(this.roleDB)
    })
  }

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

  openUpdateServiceDialog(service:ServiceModel): void{
    console.log(`The org ID is`)
    console.log(service.serviceOrganizationId)
    const dialogRef = this.dialog.open(UpdateServiceDialogComponent, {
      width: '500px',
      height:'fit-content',
      data: service,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Server response is ")
      console.log(result)
      this.services = [];
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
            let service:ServiceModel ={
              serviceId: result[i].organizationServices[j].serviceId,
              serviceName: result[i].organizationServices[j].serviceName,
              serviceStart: result[i].organizationServices[j].serviceStart,
              serviceEnd: result[i].organizationServices[j].serviceEnd,
              serviceOrganizationId: result[i].organizationServices[j].serviceOrganizationId,
              serviceStatus: result[i].organizationServices[j].serviceStatus,
              organization: null
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
    this.dataSources = new MatTableDataSource(this.organizations);
    console.log(this.organizations);
  }

}
