import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { stringify } from 'querystring';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public title: string;
  public user: User;
  public status: string;
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
    ) {
    this.title = 'Sign in';
    this.user = new User(1, '', '', 'Normal', '', '', '', '');
  }

  ngOnInit(): void {
    this.logout();
  }

  onSubmit(form){
    /*alert(Object.values(this.user));
    alert(this._userService.test());*/
    this._userService.login(this.user).subscribe(
        response => {
          console.log(response);
          this.status = response.status;

          //Save user credentials in local storage
          localStorage.setItem('token', response.token);
          localStorage.setItem('userInfo', JSON.stringify(response.userInfo));

          this._router.navigate(['/home',1]);
          form.reset();
        },
        er => {
          this.status = er.error.status;
          //this.status = 'Error';
          console.log(<any>er);
        }
      );
  }

  logout(){
    this._route.params.subscribe( params => {
      if(+params['sure']){
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
        this._router.navigate(['/home',1]);
      }
    });
    //this._router.navigate(['/home']);
  }

}
