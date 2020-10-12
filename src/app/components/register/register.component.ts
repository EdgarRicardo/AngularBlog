import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public title: string;
  public user: User;
  public status: string;
  public errors: string;

  constructor(private _userService: UserService) {
    this.title = 'Sign up';
    this.user = new User(1, '', '', 'Normal', '', '', '', '');
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    /*alert(Object.values(this.user));
    alert(this._userService.test());*/
    this._userService.register(this.user).subscribe(
        response => {
          this.status = response.status;
          form.reset();
        },
        er => {
          this.status = er.error.status;
          this.errors = er.error.errors;
          //this.status = 'Error';
          console.log(this.errors);
        }
      );
  }
}
