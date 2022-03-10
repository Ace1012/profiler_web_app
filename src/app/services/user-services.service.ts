import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl, getToken } from 'src/environments/environment';
import { addUser } from '../models/addUser';
import { deleteUser } from '../models/deleteUser';
import { updateUser } from '../models/updateUser';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  token;
  headers;


  constructor(private http:HttpClient) { 
    this.token = getToken();
    // const headers = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Authorization': 'Bearer ' + this.token
    //   })
    // };

    const headerOptions = {
      'Content-Type':  'application/json',
      'Authorization': 'Bearer ' + this.token
    }
    this.headers = headerOptions;
  }
  

  getAllUsers():Observable<any>{
    console.log(`${baseUrl}user/fetchUsers`);
    return this.http.get(`${baseUrl}user/fetchUsers`, {headers:this.headers});
  }

  addUser(user:addUser, roleId:number, address:string):Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("roleId", roleId);
    queryParams = queryParams.append("address", address);
    console.log(user)
    return this.http.post(`${baseUrl}user/createUser`, user, {params:queryParams, headers: this.headers});
  }

  updateUser(user:updateUser):Observable<any>{
    console.log(`${baseUrl}fetchUsers`);
    return this.http.patch(`${baseUrl}user/updateUser`, user, {headers:this.headers});
  }

  deleteUser(user:deleteUser):Observable<any>{
    console.log(`${baseUrl}user/deleteUser`);
    return this.http.patch(`${baseUrl}user/deleteUser`, user, {headers:this.headers});
  }
}
