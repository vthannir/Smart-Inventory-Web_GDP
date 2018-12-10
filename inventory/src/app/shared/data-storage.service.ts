import { Injectable } from "@angular/core";
import {Http} from '@angular/http'
import { AuthService } from "../auth/auth.service";
@Injectable()
export class DataStorageServcie{
    constructor(private http:Http,private authService: AuthService){}

    sharedData(){
        const token=this.authService.getToken();
        
        return this.http.put('https://smartattendance-27261.firebaseio.com/users.json?auth='+token,this);
    }

    getData(){
        const token = this.authService.getToken();

        this.http.get('https://smartattendance-27261.firebaseio.com/users.json?auth='+token);
    }
}