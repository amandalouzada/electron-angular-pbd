import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class TabelaService {

  private url: string = "http://localhost:3000/";
  private limite: number = 100;
  private headers: any = {
     'Access-Control-Allow-Origin':'*',
     'Access-Control-Allow-Methods': 'POST',
     'Access-Control-Allow-Headers': 'XMLHttpRequest,content-type',
     'Access-Control-Allow-Credentials': true
  }
  constructor(private http: Http) { }

  public getHeader(collectionName) {
    return new Promise(resolve=> {
      this.http.get(this.url+'collections/'+collectionName, {headers:this.headers})
      .map(res => res.json())
      .subscribe(data=> {
        resolve(data);
      })
    })
  }

  public getAll(pagina) {
    return new Promise(resolve=> {
      this.http.get(this.url+'collectionsPagina/tab_nova/'+((pagina-1)*this.limite).toString(), {headers:this.headers})
      .map(res => res.json())
      .subscribe(data=> {
        resolve(data);
      })
    })
  }

  public getQtd(collectionName) {
    return new Promise(resolve=> {
      this.http.get(this.url+'collectionsQtd/'+collectionName, {headers:this.headers})
      .map(res => res.json())
      .subscribe(data=> {
        resolve(data);
      })
    })
  }

}
