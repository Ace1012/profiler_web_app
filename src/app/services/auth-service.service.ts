import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }

  login(data:object):Observable<any>{
    return this.http.post(`${baseUrl}authenticate`, data);
  };

  getToken(){
    return localStorage.getItem('token');
  }

  getUserName():string{
    let token = this.getToken() as string;
    let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
    return decodedJWT.sub;
  }

  getRole(){
    let token = this.getToken() as string;
    
    if(token != null){
      let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
      return decodedJWT.role;
    }else{
      return null
    }   
  }

  isLoggedIn(){

    let token = this.getToken();
    if(token){
      return true
    }else{
      return false
    }

  }

  logout(){
    // let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
    // let username = decodedJWT.sub;
    // console.log(token)

    if(this.isLoggedIn()){
      let token = this.getToken() as string;
      console.log("logging you out...")
      let queryParams = new HttpParams().set("token", token);
      console.log(queryParams)
      let options = {params: queryParams};

      return this.http.delete(`${baseUrl}logout/deleteToken`, options).subscribe();
    }else{
      return EMPTY
    }
  }
}