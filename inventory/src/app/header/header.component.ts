import { Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { DataStorageServcie } from "../shared/data-storage.service";
import { Response} from '@angular/http'
@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent{
    constructor(private authService :AuthService,
        private dataStorageService: DataStorageServcie){

    }
    onSaveData(){
            this.dataStorageService.sharedData().subscribe(
                (response: Response) => {
                    console.log(response);
                }
            );
    }
    onLogout(){
        this.authService.logout();
        
    }

}