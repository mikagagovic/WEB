import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AppUrl} from "../../app/appservice/AppUrl.services"
import {Manager} from "./manager.model"
@Injectable()
export class HttpUsersService{
    
    constructor (private http: Http,private appUrl:AppUrl){
    }

    getManagers(): Observable<any> {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.get(this.appUrl.RootLocation+"appUser/managers",opts).map(this.extractData);
    }

    getUser(username:string):Observable<any> {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.get(this.appUrl.RootLocation+"appUser/manager/"+username,opts).map(this.extractData);
    }

    saveManager(manager:Manager){
        
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        
        return this.http.put(this.appUrl.RootLocation+"appUser/appUser/" + manager.Id, manager , opts);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }
}