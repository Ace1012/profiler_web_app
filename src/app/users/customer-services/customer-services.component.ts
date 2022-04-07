import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { UserServicesService } from 'src/app/services/user-services.service';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customer-services',
  templateUrl: './customer-services.component.html',
  styleUrls: ['./customer-services.component.css']
})
export class CustomerServicesComponent implements OnInit {

  constructor(private userService:UserServicesService) { }

  customers:any[] = [];

  roleDB!:string

  dataSources!: MatTableDataSource<Customer>;

  ngOnInit(): void {
    this.getCustomers();
    this.getDBRole()
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  generateReport(){
    let format:string = "pdf"

    // this.userService.generateCustomersReport(format).subscribe(result=>{

    //   const fileURL = URL.createObjectURL(result);
    //   console.log(`File URL is`)
    //   console.log(fileURL)
      
    //   window.open(fileURL,`_blank`)
    // })

    this.userService.generateCustomersReport(format).subscribe(result=>{
      // const filename = result.headers.get('Content-Disposition')
      console.log("Response is")
      console.log(result)
      var url = window.URL.createObjectURL(result.body);
      var anchor = document.createElement("a");
      anchor.download = "Tinka-Customers.pdf";
      anchor.href = url;
      anchor.click();
    });
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
  
  getCustomers(){
    this.userService.fetchCustomerServices().subscribe(results=>{

      for(let i = 0; i < results.length; i++){

        console.log(`Services ${i}`)
        console.log(results[i].services)
        let customer:Customer = {
          userId: results[i].userDisplayBean.userId,
          userName: results[i].userDisplayBean.userName,
          userFirstName: results[i].userDisplayBean.userFirstname,
          userMiddleName: results[i].userDisplayBean.userMiddlename,
          userLastName: results[i].userDisplayBean.userlastName,
          status: results[i].userDisplayBean.statusBean,
          userCreated: results[i].userDisplayBean.userCreated,
          addresses: results[i].userDisplayBean.addresses,
          contacts: results[i].userDisplayBean.contacts,
          services: results[i].services
        }

        this.customers.push(customer)
      }

      this.dataSources = new MatTableDataSource(this.customers);
    })
  }

}
