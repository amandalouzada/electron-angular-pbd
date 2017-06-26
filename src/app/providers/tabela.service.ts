import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class TabelaService {

  public url: string = "http://localhost:3000/";
  public limite: number = 100;
  public headers: any = {
     'Access-Control-Allow-Origin':'*',
     'Access-Control-Allow-Methods': 'POST',
     'Access-Control-Allow-Headers': 'XMLHttpRequest,content-type',
     'Access-Control-Allow-Credentials': true
  }
  constructor(public http: Http) { }

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

  public getConfTabela(collectionName) {
    return new Promise(resolve=> {
      this.http.get(this.url+'collectionsConf/'+collectionName+'/', {headers:this.headers})
      .map(res => res.json())
      .subscribe(data=> {
        resolve(data);
      })
    })
  }


  public getCollectionPaginada(pagina, collectionName) {
    return new Promise(resolve=> {
      this.http.get(this.url+'collectionsPagina/'+collectionName+'/'+((pagina-1)*this.limite).toString(), {headers:this.headers})
      .map(res => res.json())
      .subscribe(data=> {
        resolve(data);
      })
    })
  }

  public getCollectionPagOrder(pagina, collectionName, sort) {
    return new Promise(resolve=> {
      this.http.get(this.url+'collectionsOrder/'+collectionName+'/'+sort.parametro+'/'+sort.ordem+'/'+((pagina-1)*this.limite).toString(), {headers:this.headers})
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

  public getTabelas() {
    return new Promise(resolve=> {
      this.http.get(this.url+'collections/', {headers:this.headers})
      .map(res => res.json())
      .subscribe(data=> {
        resolve(data);
      })
    })
  }

  public getDataArray(tabela): any[] {
    let array = [];
    for (let linha in tabela ){
      let vet = [];
      for(let key in tabela[linha] ) {
        vet.push(tabela[linha][key]);
      }
      array.push(vet)
    }
    return array;
  }
}
