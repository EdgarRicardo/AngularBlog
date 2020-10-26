import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { global_info } from 'src/app/services/global_info';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'general-post',
  templateUrl: './general-post.component.html',
  styleUrls: ['./general-post.component.css'],
  providers: [UserService, PostService]
})
export class GeneralPostComponent implements OnInit {
  public userInfo;
  public  token;
  public  url: string;
  @Input()  posts: Array<any>;
  public  status: string;
  public  idPost: number;
  public postTS ; // Post to see
  //public height;

  constructor(public _userService: UserService,
    public _postService: PostService){
    this.loadUser();
    this.url = global_info.url;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.

  }

  loadUser(){
    this.userInfo = this._userService.getInfoUser() ?? -1;
    this.token = this._userService.getToken();
  }

  loadIDpost(id){
    this.idPost = id;
  }

  deletePost(){
    this._postService.deletePost(this.idPost, this.token).subscribe(
      response => {
        this.status = response.status;
        this.deletePostOfArray(this.idPost); // To update the screen!
        console.log(response);
      },
      er => {
        this.status = er.error.status;
        //this.message = er.error.message;
        console.log(<any>er);
      }
    );
  }

  //Binary Search of ID
  getPosOfPostInArray(id, start = 0, end = this.posts.length -1){
    let index = Math.round(start + (end - start) / 2);
    if(end >= start){
      const post = this.posts[index];
      if(post.id == id ) return index;
      if(post.id > id ) return this.getPosOfPostInArray(id,start,index-1);
      return this.getPosOfPostInArray(id,index+1,end);
    }
    return null;
  }

  deletePostOfArray(id){
    this.posts.splice(this.getPosOfPostInArray(id),1);
  }

  getPostToSee(id){
    this.postTS = this.posts[this.getPosOfPostInArray(id)];
    let posDate = this.postTS.created_at.indexOf("T");
    this.postTS.created_at = this.postTS.created_at.substr(0,posDate);
  }
}
