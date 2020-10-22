import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global_info } from './global_info';

@Injectable({
  providedIn: 'root'
})
export class PostService {
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
    else if (type == 'delete')
      return this._http.delete(this.url+link, {headers: headers});
  }

  register(category, token){
    return this.request(category, 'post/','post', token);
  }


  update(post, token){
    return this.request(post, 'post/'+post.id,'put', token);
  }

  getPostsByCategory(id){
    return this.request(null, 'postsCategory/'+id,'get');
  }

  getPostsByUser(id){
    return this.request(null, 'postsUser/'+id,'get');
  }

  getPosts(){
    return this.request(null, 'getPosts/','get');
  }

  deletePost(id, token){
    return this.request(null, 'post/'+id,'delete', token);
  }
}
