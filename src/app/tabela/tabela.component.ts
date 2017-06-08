import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { TabelaService } from '../providers/tabela.service';
import { MaterializeAction } from 'angular2-materialize';
import { Observable } from 'rxjs/Observable';
import {ReversePipe} from 'ngx-pipes/src/app/pipes/array/reverse';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {

  modalVisibilidade = new EventEmitter<string|MaterializeAction>();
  modalConf = new EventEmitter<string|MaterializeAction>();

  public tabela: any;
  public collectionName: any;
  inscricao: Subscription;
  public cabecalho: any={};
  public qtdRegistros: any = {};
  public qtd:any;
  public sort: any={};
  public visivel: any={};
  public configuracao: any={};
  public campo: any='_id';



  constructor(public route: ActivatedRoute,
     public router: Router,
     public tabelaService: TabelaService) {
       this.sort ={parametro:'_id', ordem:-1};
     }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.collectionName = params['nome'];

        this.tabelaService.getHeader(this.collectionName)
          .then((res)=>{
            if(res)
              for (let key in res[0]){
                this.visivel[key]=1;
                this.configuracao[key]={nome:'', tipo: '', mascara: []};
              }
              this.cabecalho = res[0];
              console.log(this.configuracao);
          },(error)=>{
            console.log(error);
          })

          this.tabelaService.getCollectionPagOrder(1,this.collectionName, this.sort)
            .then((res)=>{
              this.tabela = res;
            },(error)=>{
              console.log(error);
            })

          this.tabelaService.getQtd(this.collectionName)
            .then((res)=>{
              if(res) {
                //ISSO É UMA GAMBIARRA
                this.qtdRegistros = res;
                this.qtd = this.qtdRegistros.count;

              }
            },(error)=>{
              console.log(error);
            })

      }
    )

  }


  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

  getTabela($event: any){
    this.tabelaService.getCollectionPaginada($event,this.collectionName)
      .then((res)=>{
        this.tabela = res;
      },(error)=>{
      })
  }

  getTabelaOrdem($event: any){
    this.tabelaService.getCollectionPagOrder($event,this.collectionName, this.sort)
      .then((res)=>{
        this.tabela = res;
      },(error)=>{
      })
  }

  getOrdem(parametro){
    if(this.sort.parametro == parametro) {
      this.sort.ordem = this.sort.ordem*(-1)
    } else {
      this.sort.parametro = parametro;
      this.sort.ordem = -1;
    }
    this.tabelaService.getCollectionPagOrder(1,this.collectionName, this.sort)
      .then((res)=>{
        this.tabela = res;
      },(error)=>{
      })
  }

  openModalV() {
    this.modalVisibilidade.emit({action:"modal",params:['open']});
  }

  openModalC() {
    this.modalConf.emit({action:"modal",params:['open']});
  }

  closeModalV() {
    this.modalVisibilidade.emit({action:"modal",params:['close']});
  }
  mudou(){
    console.log(this.campo);
  }
  closeModalC() {
    this.modalConf.emit({action:"modal",params:['close']});
  }

}
