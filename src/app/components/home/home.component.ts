import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Post } from 'src/app/Models/post';
import { CategoryService } from 'src/app/services/category.service';
import { global_info } from 'src/app/services/global_info';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, CategoryService, PostService]

})

export class HomeComponent implements OnInit{
  title = 'Personal Blog';
  public userInfo;
  public token;
  public posts: Array<Post>;
  public status: string;


  constructor(public _userService: UserService,
    public _categoryService: CategoryService,
    public _postService: PostService){
    this.loadUser();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    console.log('Page loaded correctly');
    this.getPosts();
  }

  loadUser(){
    this.userInfo = this._userService.getInfoUser() ?? -1;
    this.token = this._userService.getToken();
  }

  getPosts(){
    this._postService.getPosts().subscribe(
      response => {
        if(Object.keys(response.post).length === 0) this.posts = null;
        else {
          this.posts = response.post;
          console.log(this.posts);
        }
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
