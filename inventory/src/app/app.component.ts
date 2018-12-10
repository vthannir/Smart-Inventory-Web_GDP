import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loadedFeature = 'signup';
  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyAZe2wGAYCTJMwmPktIwt29P-91Zkm6t0I",
      authDomain: "smartattendance-27261.firebaseapp.com"

    });


  }
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
