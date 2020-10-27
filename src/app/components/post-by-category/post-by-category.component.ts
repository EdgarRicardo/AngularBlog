import { ChangeDetectionStrategy, Component, OnInit, DoCheck, OnChanges } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Post } from 'src/app/Models/post';

@Component({
  selector: 'app-post-by-category',
  templateUrl: './post-by-category.component.html',
  styleUrls: ['./post-by-category.component.css'],
  providers: [PostService]
})
export class PostByCategoryComponent implements OnInit, DoCheck {
  public title = 'Post By Category';
  public token;
  public userInfo;
  public status: string;
  public posts: Array<Post> = null;
  public idCategory: number;
  public categoryName: string;


  constructor(
    public _postService: PostService,
    private _route: ActivatedRoute) {
      //this.idCategory =this._route.snapshot.params.category;
      //this.loadUser();
    }

  ngOnInit(): void {
    this.idCategory =this._route.snapshot.params.category;
    this.getPosts();
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    if(this.idCategory != this._route.snapshot.params.category){
      this.idCategory = this._route.snapshot.params.category;
      this.getPosts();
    }
  }

  getPosts(){
    this._postService.getPostsByCategory(this.idCategory).subscribe(
      response => {
        console.log(response);
        if(Object.keys(response.post).length === 0) this.posts = null;
        else this.posts = response.post;

        this.categoryName = response.category;
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
