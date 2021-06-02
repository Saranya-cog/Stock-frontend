import {  Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
    providedIn: 'root',
})
export class StockService{
    private serviceURL="";
   

    constructor(private http:HttpClient){

    }

    getCompanyDetails(){
        let headers={     
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': 'http://localhost:4200'};
        return this.http.get<any>("https://stockmarket20210601124745.azurewebsites.net/api/v1.0/market/company/getall",{headers:headers})
        .pipe(map(data =>{
            return data;
        }));
    }

    getStockDetails(code,sDate,eDate){
        let headers={     
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': 'http://localhost:4200'};
        return this.http.get<any>("https://stockmarket20210601124745.azurewebsites.net/api/v1.0/market/stock/add/"+code+"/"+sDate+"/"+eDate,{headers:headers})
        .pipe(map(data =>{
            return data;
        }));
    }

    headers(){

    }

   

}

