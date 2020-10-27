import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, routingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { PostByCategoryComponent } from './components/post-by-category/post-by-category.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { GeneralPostComponent } from './components/general-post/general-post.component';
import { IdentityGuard } from './services/identity.guard';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent,
    UserEditComponent,
    NewCategoryComponent,
    PostByCategoryComponent,
    ProfileComponent,
    NewPostComponent,
    GeneralPostComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    AngularFileUploaderModule
  ],
  providers: [
    routingProviders,
    IdentityGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
