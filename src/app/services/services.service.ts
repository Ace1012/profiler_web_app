import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { AddService } from '../models/addService';
import { DeleteService } from '../models/deleteService';
import { UpdateService } from '../models/updateService';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http:HttpClient) { }

  getStatuses():Observable<any>{
    return this.http.get(`${baseUrl}status/fetchStatuses`)
  }
  
  addService(service:AddService):Observable<any>{
    return this.http.post(`${baseUrl}services/addService`, service)
  }

  getServices():Observable<any>{
    console.log(`${baseUrl}services/fetchServices`)
    return this.http.get(`${baseUrl}services/fetchServices`);
  }

  addCustomerService(customerId:number, serviceId:number):Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("customerId", customerId);
    queryParams = queryParams.append("serviceId", serviceId);
    
    return this.http.post(`${baseUrl}user/addCustomerService`, null, {params:queryParams})
  }

  updateService(service:UpdateService):Observable<any>{
    return this.http.patch(`${baseUrl}services/updateService`, service);
  }

  deleteService(service:DeleteService):Observable<any>{
    return this.http.patch(`${baseUrl}services/deleteService`, service)
  }

  generateServicesReport(format:string):Observable<any>{

    let queryparams = new HttpParams();
    queryparams = queryparams.append("format", format);

    // let headers = new HttpHeaders();
    // headers = headers.set('Accept', 'application/pdf');

    return this.http.get(`${baseUrl}reports/servicesReport`, {params:queryparams, responseType: 'blob', observe: 'response'})
  }

}
