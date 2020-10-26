import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/Models/post';
import { CategoryService } from 'src/app/services/category.service';
import { global_info } from 'src/app/services/global_info';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  public title_page = 'New Post';
  public post: Post;
  public status: string;
  public categories: Array<Object>;
  public userInfo;
  public token;
  public afuConfig;
  public message: string;
  public url: string;

  constructor(public _postService: PostService,
    public _userService: UserService,
    public _categoryService: CategoryService) {
      this.loadUser();
      this.url = global_info.url;
      this.post = new Post(1,this.userInfo.sub,1,'','','');
      this.afuConfig = {
        multiple: false,
        formatsAllowed: ".jpg, .png, .jpeg, .gif",
        maxSize: "1",
        uploadAPI:  {
              url:global_info.url+"uploadImage",
              method:"POST",
              headers: {"Authorization" : this.token,},
            },
            theme: "attachPin",
            hideProgressBar: false,
            hideResetBtn: true,
            hideSelectBtn: false,
            fileNameIndex: true,
            replaceTexts: {
              selectFileBtn: 'Select Files',
              resetBtn: 'Reset',
              uploadBtn: 'Upload',
              dragNDropBox: 'Drag N Drop',
              attachPinBtn: 'Select the image for your post',
              afterUploadMsg_success: 'Successfully Uploaded !',
              afterUploadMsg_error: 'Upload Failed !',
              sizeLimit: 'Size Limit'
            }
        };
    }

  ngOnInit(): void {
    this.getCategories();

  }

  loadUser(){
    this.userInfo = this._userService.getInfoUser();
    this.token = this._userService.getToken();
  }
  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        console.log(response.categories);
        this.categories = response.categories;
      });
  }

  imageUpload(data){
    console.log(data);
    this.post.image = data.body.image;
  }

  onSubmit(form){
    this._postService.register(this.post, this.token).subscribe(
      response => {
        console.log(response);
        this.status = response.status;
        this.message = response.message;
        form.reset();
        this.getCategories();
      },
      er => {
        this.status = er.error.status;
        this.message = er.error.message;
        console.log(<any>er);
      }
    );
  }

}
