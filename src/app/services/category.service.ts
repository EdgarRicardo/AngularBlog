import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global_info } from './global_info';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public url: string;
  public userInfo = null;
  public token = null;

  constructor(public _http: HttpClient) {
    this.url = global_info.url;
   }

  request(category, link, type, token = null): Observable<any>{
    let jsonData = JSON.stringify(category);
    let data = 'json='+jsonData;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    if(token)
      headers = headers.append('Authorization', token);

    if(type == 'post')
      return this._http.post(this.url+link, data, {headers: headers});
    else if (type == 'put')
      return this._http.put(this.url+link, data, {headers: headers});
    else if (type == 'get')
      return this._http.get(this.url+link);
  }

  register(category, token){
    return this.request(category, 'category/','post', token);
  }


  update(category, token){
    return this.request(category, 'category/'+category.id,'put', token);
  }

  getCategories(){
    return this.request(null, 'category/','get');
  }
}
