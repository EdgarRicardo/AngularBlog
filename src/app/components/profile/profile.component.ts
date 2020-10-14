import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PostService, UserService]
})
export class ProfileComponent implements OnInit {
  public title = 'Your posts';
  public token;
  public userInfo;
  public status;
  public posts = null;

  constructor(public _postService: PostService,
    public _userService: UserService) {
      this.loadUser();
  }

  ngOnInit(): void {
    this.getPosts();
  }

  loadUser(){
    this.userInfo = this._userService.getInfoUser();
    this.token = this._userService.getToken();
  }

  getPosts(){
    this._postService.getPostsByUser(this.userInfo.sub).subscribe(
      response => {
        console.log(response.post);
        if(Object.keys(response.post).length === 0) this.posts = null;
        else this.posts = response.post;
        //this.message = response.message;
      },
      er => {
        this.status = er.error.status;
        //this.message = er.error.message;
        console.log(<any>er);
      }
    );
  }
}
