import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, DoCheck, OnInit } from '@angular/core';
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
  public url;
  public categories;
  public posts;
  public status;
  public idPost;


  constructor(public _userService: UserService,
    public _categoryService: CategoryService,
    public _postService: PostService){
    this.loadUser();
    this.getCategories();
    this.url = global_info.url;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    console.log('Page loaded correctly');
  }

  loadUser(){
    this.userInfo = this._userService.getInfoUser() ?? -1;
    this.token = this._userService.getToken();
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        console.log(response.categories);
        this.categories = response.categories;
        if(Object.keys(this.categories).length > 0){
          this.getPosts();
        }
      });
  }

  getPosts(){
    this._postService.getPosts().subscribe(
      response => {
        if(Object.keys(response.post).length === 0) this.posts = null;
        else {
          this.posts = response.post;
          this.posts.forEach(element => {
            let categoryName = this.categories[element.category_id-1];
            element.categoryName = categoryName.name;
          });
          console.log(response);
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

  loadIDpost(id){
    this.idPost = id;
  }

  deletePost(){
    this._postService.deletePost(this.idPost, this.token).subscribe(
      response => {
        this.status = response.status;
        this.getPosts();
        console.log(response);
      },
      er => {
        this.status = er.error.status;
        //this.message = er.error.message;
        console.log(<any>er);
      }
    );
  }
}
