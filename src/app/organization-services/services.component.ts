import { Component, OnInit } from '@angular/core';
import { ServiceModel } from '../models/serviceModel';
import { ServiceOrganization } from '../models/service-organization';
import { ServicesService } from '../services/services.service';
import { rowsAnimation } from '../rows-animation';
import { AuthServiceService } from '../services/auth-service.service';
import { lastValueFrom } from 'rxjs';
import { UserServicesService } from '../services/user-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { UpdateServiceDialogComponent } from '../update-service-dialog/update-service-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddServiceDialogComponent } from '../add-service-dialog/add-service-dialog.component';
import { DeleteService } from '../models/deleteService';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  animations:[rowsAnimation]
})
export class ServicesComponent implements OnInit {

  services:ServiceModel[] = [];
  addService!:ServiceModel;

  role!:string;
  roleDB!:string;
  customerId!:number;

  dataSources!: MatTableDataSource<ServiceModel>;

  constructor(
    private servicesService:ServicesService,
    private userService:UserServicesService,
    private auth:AuthServiceService,
    private snackBar:MatSnackBar,
    private dialog:MatDialog
    ) { }

  ngOnInit(): void {
    this.getServices()
    this.getDBRole()
    this.getUserId()
    console.log(`Datasource is`)
    console.log(this.dataSources)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSources.filter = filterValue.trim().toLowerCase();
    console.clear()
    console.log(`Datasource is`)
    console.log(this.dataSources)
  }

  generateReport(){
    let format:string = "pdf"

    // this.servicesService.generateServicesReport(format).subscribe(result=>{

    //   const fileURL = URL.createObjectURL(result);
    //   console.log(`File URL is`)
    //   console.log(fileURL)
      
    //   window.open(fileURL,`_blank`)
    // })

    this.servicesService.generateServicesReport(format).subscribe(result=>{
      console.log(`Result is`)
      console.log(result)

      var url = window.URL.createObjectURL(result.body);
      var anchor = document.createElement("a");
      anchor.download = "Tinka-Services.pdf";
      anchor.href = url;
      anchor.click();
    });
  }

  openUpdateDialog(service:ServiceModel): void{
    const dialogRef = this.dialog.open(UpdateServiceDialogComponent, {
      width: '500px',
      height:'fit-content',
      data: service,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Server response is ")
      console.log(result)
      this.services = [];
      this.getServices();
    });
  }

  openAddDialog(): void{
    const dialogRef = this.dialog.open(AddServiceDialogComponent, {
      width: '700px',
      height:'fit-content',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Server response is ")
      console.log(result)
      this.services = [];
      this.getServices();
    });
  }

  openSnackBar(message:string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000,
      data: message,
      panelClass:['red-snackbar']
    });
  }

  addCustomerService(serviceId:number){
    console.log(`This is the serviceId: `)
    console.log(serviceId)
    this.servicesService.addCustomerService(this.customerId, serviceId).subscribe(result=>{
      console.log(result)
      this.openSnackBar(`Added customer service successfully!`)
    })
  }

  async getUserId(){
    let token = this.auth.getToken() as string;
    let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
    let username = decodedJWT.sub;

    await lastValueFrom(this.userService.getUserId()).then((userId)=>{
      this.customerId = userId;
      console.log("This is the id: ")
      console.log(this.customerId)
  })
  }

  async getDBRole(){
    await lastValueFrom(this.userService.getUserRole()).then((roleBean)=>{
        this.roleDB = roleBean.roleName;
        console.log("This is the role: ")
        console.log(this.roleDB)
    })
  }

  callDelete(id:number){

    let deleteService:DeleteService = {
      serviceId:id
    }

    this.servicesService.deleteService(deleteService).subscribe(result=>{
      console.log(result)
      this.openSnackBar(result.message)
      this.services = []
      this.getServices()
    })
  }

  getServices(){
    this.servicesService.getServices().subscribe(result=>{
      for(let i = 0; i < result.length; i++){
        let organization:ServiceOrganization = {
          organizationId:result[i].organization.organizationId,
          organizationName:result[i].organization.organizationName,
          organizationMobile:result[i].organization.organizationMobile,
          organizationPostal:result[i].organization.organizationPostal,
          addressesId:result[i].organization.addressId
        }

        let service:ServiceModel = {
          serviceId:result[i].serviceId,
          serviceName:result[i].serviceName,
          serviceStart:result[i].serviceStart,
          serviceEnd:result[i].serviceEnd,
          organization:organization,
          serviceStatus:result[i].status.statusId
        }
        this.services.push(service)
      }
    })
    this.dataSources = new MatTableDataSource(this.services);
    console.log(this.services)
  }
}
