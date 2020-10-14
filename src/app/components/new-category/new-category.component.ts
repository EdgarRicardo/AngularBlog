import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/services/category.service';
import { global_info } from 'src/app/services/global_info';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css'],
  providers: [UserService, CategoryService]
})
export class NewCategoryComponent implements OnInit {
  public title = 'Category Settings';
  public token;
  public userInfo;
  public status;
  public category: Category;
  public categories;
  public message;
  constructor(public _userService: UserService, public _categoryService: CategoryService) {
    this.loadUser();
    this.getCategories();
    this.category = new Category(1, '');
  }

  ngOnInit(): void {
  }

  loadUser(){
    this.userInfo = this._userService.getInfoUser();
    this.token = this._userService.getToken();
  }

  onSubmitCreate(form){
    this._categoryService.register(this.category, this.token).subscribe(
      response => {
        console.log(response);
        this.status = response.status;
        this.message = response.message;
        this.getCategories();
      },
      er => {
        this.status = er.error.status;
        this.message = er.error.message;
        console.log(<any>er);
      }
    );
  }

  onSubmitUpdate(form){
    this._categoryService.update(this.category, this.token).subscribe(
      response => {
        console.log(response);
        this.status = response.status;
        this.message = response.message;
        this.getCategories();
      },
      er => {
        this.status = er.error.status;
        this.message = er.error.message;
        console.log(<any>er);
      }
    );
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        console.log(response.categories);
        this.categories = response.categories;
      });
  }

}
