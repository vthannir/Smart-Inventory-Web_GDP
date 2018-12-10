import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { FormsModule } from '@angular/forms'
import { AuthService } from './auth/auth.service';
import { AdminItemComponent } from './admin-item/admin-item.component';
import { ItemComponent } from './item/item.component';
import { HttpModule } from '@angular/http'
import { DataStorageServcie } from './shared/data-storage.service';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    AdminItemComponent,
    ItemComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
    

  ],
  providers: [AuthService,DataStorageServcie],
  bootstrap: [AppComponent]
})
export class AppModule { }
