import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AdminItemComponent } from './admin-item/admin-item.component';
import { UserComponent } from './user/user.component';

const appRoutes: Routes = [
  {path: 'signup' , component: SignupComponent},
  {path: 'signin', component:SigninComponent},
  {path: 'item', component:AdminItemComponent},
  {path: 'user',component:UserComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
