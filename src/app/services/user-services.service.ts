import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { addUser } from '../models/addUser';
import { deleteUser } from '../models/deleteUser';
import { updateUser } from '../models/updateUser';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  // token;
  // headers;


  constructor(private http:HttpClient, private authService:AuthServiceService) { 
    // this.token = authService.getToken();

    // const headerOptions = {
    //   'Content-Type':  'application/json',
    //   'Authorization': 'Bearer ' + this.token
    // }
    // this.headers = headerOptions;
  }

  getAllUsers():Observable<any>{
    console.log(`${baseUrl}user/fetchUsers`);
    return this.http.get(`${baseUrl}user/fetchUsers`);
  }

  fetchUser(username:string):Observable<any>{
    console.log(`Username is`)
    console.log(username)

    console.log(`\n\n`)

    let queryParams = new HttpParams();

    queryParams = queryParams.append("userName", username);

    console.log(`QueryParams are: `)
    console.log(queryParams)

    return this.http.get(`${baseUrl}user/fetchUser`, {params: queryParams})
  }

  addUser(user:addUser, roleId:number, address:string):Observable<any>{
    let queryParams = new HttpParams();

    queryParams = queryParams.append("roleId", roleId);
    queryParams = queryParams.append("address", address);

    console.log(queryParams)
    console.log(this.http.post(`${baseUrl}user/createUser`, user, {params:queryParams}));

    return this.http.post(`${baseUrl}user/createUser`, user, {params:queryParams});
  }

  updateUser(user:updateUser):Observable<any>{
    console.log(`${baseUrl}fetchUsers`);
    return this.http.patch(`${baseUrl}user/updateUser`, user);
  }

  deleteUser(user:deleteUser):Observable<any>{
    console.log(`${baseUrl}user/deleteUser`);
    return this.http.patch(`${baseUrl}user/deleteUser`, user);
  }

  getUserRole():Observable<any>{
    let token = this.authService.getToken() as string;
    if(token != null){
      let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
      let username = decodedJWT.sub;

      let queryParams = new HttpParams();
      queryParams = queryParams.append("userName", username);
      
      return this.http.get(`${baseUrl}user/getUserRole`, {params: queryParams});
    }else{
      return EMPTY
    }
  }

  fetchAccountStatusOptions():Observable<any>{
    return this.http.get(`${baseUrl}user/fetchAccountStatusOptions`);
  }

  getUserId():Observable<any>{
    let token = this.authService.getToken() as string;
    let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
    let username = decodedJWT.sub;

    let queryParams = new HttpParams();
    queryParams = queryParams.append("userName", username);
    return this.http.get(`${baseUrl}user/getUserIdByName`, {params:queryParams})
  }

  fetchCustomerServices():Observable<any>{
    return this.http.get(`${baseUrl}user/fetchCustomers`)
  }

  generateCustomersReport(format:string):Observable<any>{

    let queryparams = new HttpParams();
    queryparams = queryparams.append("format", format);

    // let headers = new HttpHeaders();
    // headers = headers.set('Accept', 'application/pdf');

    return this.http.get(`${baseUrl}reports/customersReport`, {params:queryparams, responseType: 'blob', observe: 'response'})
  }
}
