import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/user';
import { global_info } from './global_info';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;
  public userInfo = null;
  public token = null;

  constructor(public _http: HttpClient) {
    this.url = global_info.url;
  }

  test(){
    return 'test Service';
  }

  request(user, link, type, token = null): Observable<any>{
    let jsonData = JSON.stringify(user);
    let data = 'json='+jsonData;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    if(token)
      headers = headers.append('Authorization', token);

    if(type == 'post')
      return this._http.post(this.url+link, data, {headers: headers});
    else if (type == 'put')
      return this._http.put(this.url+link, data, {headers: headers});
  }

  register(user){
    return this.request(user, 'newUser','post');
  }

  login(user){
    return this.request(user, 'login','post');
  }

  update(user, token){
    return this.request(user, 'updateUser','put', token);
  }

  getToken(){
    if(localStorage.getItem('token'))
      this.token = localStorage.getItem('token');

    return this.token;
  }

  getInfoUser(){
    if(localStorage.getItem('userInfo'))
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));

      return this.userInfo;
  }


}
