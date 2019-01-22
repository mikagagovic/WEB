import {Injectable} from '@angular/core'

@Injectable()
export class AppUrl{

    public RootLocation: string

    constructor(){
        this.RootLocation = "https://localhost:44331/";
    }
}