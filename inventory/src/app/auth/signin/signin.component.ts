import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit() {
  }

  onSignin(form: NgForm){
    const email=form.value.email;
    const password=form.value.password;
   // let status=document.getElementById('admin').nodeValue;
    var status=form.value.admin;
    console.log(status);

    this.authService.signinUser(email,password,status);
    if(this.authService.isAuthenticated() && String(status)==="admin"){
    this.router.navigate(['/item']);
    }
    if(this.authService.isAuthenticated() && String(status)==="user"){
      this.router.navigate(['/user']);
      }




  }
}
