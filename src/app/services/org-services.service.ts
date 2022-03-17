import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { AddOrganization } from '../models/addOrganization';

@Injectable({
  providedIn: 'root'
})
export class OrgServicesService {

  constructor(private http:HttpClient) { }

  orgUrl = `${baseUrl}organizations`;

  getAllOrgs():Observable<any>{
    return this.http.get(`${this.orgUrl}/fetchOrgs`);
  }

  addOrg(org:AddOrganization, address:string){

    let queryParams = new HttpParams();
    queryParams = queryParams.append("address", address);

    return this.http.post(`${this.orgUrl}/addOrg`, org, {params: queryParams});
  }

}
