import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { global_info } from 'src/app/services/global_info';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  title = 'Settings';
  public userInfo = null;
  public token = null;
  public user: User;
  public status: string;
  public afuConfig;
  public url;
  constructor(public _userService: UserService) {
    this.loadUser();
    this.url = global_info.url;
    this.user = new User(1,
      this.userInfo.name,
      this.userInfo.surname,
      'Normal',
      this.userInfo.email, '',
      this.userInfo.description,
      this.userInfo.image);

      this.afuConfig = {
        multiple: false,
        formatsAllowed: ".jpg, .png, .jpeg, .gif",
        maxSize: "1",
        uploadAPI:  {
              url:global_info.url+"uploadAvatar",
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
              attachPinBtn: 'Select your avatar',
              afterUploadMsg_success: 'Successfully Uploaded !',
              afterUploadMsg_error: 'Upload Failed !',
              sizeLimit: 'Size Limit'
            }
        };

  }

  ngOnInit(): void {
  }

  loadUser(){
    this.userInfo = this._userService.getInfoUser();
    this.token = this._userService.getToken();
  }

  onSubmit(form){
    //alert(this.token);
    this._userService.update(this.user, this.token).subscribe(
      response => {
        console.log(response);
        localStorage.setItem('userInfo',JSON.stringify(response.user));
        this.userInfo = this._userService.getInfoUser();
        //if(!this.userInfo.email.localeCompare(response.user.email))
        this.status = response.status;
      },
      er => {
        this.status = er.error.status;
        //this.status = 'Error';
        console.log(<any>er);
      }
    );
  }

  avatarUpload(data){
    console.log(data);
    this.user.image = data.body.image;
  }

}
