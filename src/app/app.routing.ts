import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { PostByCategoryComponent } from './components/post-by-category/post-by-category.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { IdentityGuard } from './services/identity.guard';

//Defining routes
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'logout/:sure', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'home', component:HomeComponent},
  {path: 'settings', component:UserEditComponent, canActivate: [IdentityGuard]},
  {path: 'categorySettings', component:NewCategoryComponent, canActivate: [IdentityGuard]},
  {path: 'postByCategory/:category', component:PostByCategoryComponent},
  {path: 'profile', component:ProfileComponent, canActivate: [IdentityGuard]},
  {path: 'newPost', component:NewPostComponent, canActivate: [IdentityGuard]},
  {path: '**', component:ErrorComponent},
  {path: 'error', component:ErrorComponent}
];

//Importing configuration
export const routingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);

