import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { TabelaService } from '../providers/tabela.service';
import { MaterializeAction } from 'angular2-materialize';
import { Observable } from 'rxjs/Observable';
import {ReversePipe} from 'ngx-pipes/src/app/pipes/array/reverse';
import * as Handsontable from 'handsontable/dist/handsontable.full.js';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {

  modalVisibilidade = new EventEmitter<string|MaterializeAction>();
  modalConf = new EventEmitter<string|MaterializeAction>();
  modalConfNovo = new EventEmitter<string|MaterializeAction>();
  modalConfImp = new EventEmitter<string|MaterializeAction>();
  modalConfExp = new EventEmitter<string|MaterializeAction>();

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
  private data: any[];
  private colHeaders: string[]=[];
  private columns: any[]=[];
  private options: any;
  private configuracoes: any =[];
  private colunaConf: string;
  private tipo: string;
  private colunaConfNome: string;
  private tipos: any =["TEXTO", "NUMÉRICO", "BOOLEANO", "DATA", "HORA"];

  constructor(public route: ActivatedRoute,
     public router: Router,
     public tabelaService: TabelaService) {

       this.sort ={parametro:'_id', ordem:-1};

       this.options = {
         rowHeaders: true,
         stretchH: 'all',
         columnSorting: true,
         contextMenu: true,
         readOnly: true
       }
     }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.collectionName = params['nome'];

        this.tabelaService.getConfTabela(this.collectionName)
          .then((res)=>{
            if(res) {
              let colunas = {colunas:{}};
              colunas = res[0]
              this.configuracoes = colunas.colunas;
              this.tipo="TEXTO";
            }
          },(error)=>{
            console.log(error);
          })

        this.tabelaService.getHeader(this.collectionName)
          .then((res)=>{
            if(res)
              for (let key in res[0]){
                this.colHeaders.push(key);
                this.visivel[key]=1;
                this.configuracao[key]={nome:'', tipo: '', mascara: []};
              }
              this.cabecalho = res[0];
              this.colunaConf = this.colHeaders[0];
              console.log(this.colHeaders);
          },(error)=>{
            console.log(error);
          })

          this.tabelaService.getCollectionPagOrder(1,this.collectionName, this.sort)
            .then((res)=>{
              this.tabela = res;
              this.data = this.tabelaService.getDataArray(this.tabela);

            },(error)=>{
              console.log(error);
            })

          this.tabelaService.getQtd(this.collectionName)
            .then((res)=>{
              if(res) {
                //ISSO É UMA GAMBIARRA
                let resposta = {count:0};
                resposta =res[0];
                console.log(resposta);
                this.qtd = resposta.count-1;
                console.log(this.qtd );

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
        this.data = this.tabelaService.getDataArray(this.tabela);
      },(error)=>{
      })
  }

  getTabelaOrdem($event: any){
    this.tabelaService.getCollectionPagOrder($event,this.collectionName, this.sort)
      .then((res)=>{
        this.tabela = res;
        this.data = this.tabelaService.getDataArray(this.tabela);
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
        this.data = this.tabelaService.getDataArray(this.tabela);
      },(error)=>{
      })
  }


  // MODAL CONFIGURAÇÕES

  openModalC() {
    this.modalConf.emit({action:"modal",params:['open']});
  }

  closeModalC() {
    this.modalConf.emit({action:"modal",params:['close']});
  }

  // MODAL VISIBILIDADE

  openModalV() {
    this.modalVisibilidade.emit({action:"modal",params:['open']});
  }

  closeModalV() {
    this.modalVisibilidade.emit({action:"modal",params:['close']});
  }

  // MODAL NOVA CONFIGURAÇÕES

  openModalConfNovo() {
    this.modalConfNovo.emit({action:"modal",params:['open']});
  }

  closeConfNovo() {
    this.modalConfNovo.emit({action:"modal",params:['close']});
  }

  // MODAL IMPORTAR CONFIGURAÇÕES

  openModalConfImp() {
    this.modalConfImp.emit({action:"modal",params:['open']});
  }

  closeConfImp() {
    this.modalConfImp.emit({action:"modal",params:['close']});
  }

  // MODAL ESPORTAR CONFIGURAÇÕES

  openModalConfExp() {
    this.modalConfExp.emit({action:"modal",params:['open']});
  }

  closeConfExp() {
    this.modalConfExp.emit({action:"modal",params:['close']});
  }

  atualizaConf(){
    console.log("atualizou");
    this.tipo = this.configuracoes[this.colunaConf].tipo;
    this.colunaConfNome = this.configuracoes[this.colunaConf].nome;
    console.log(this.tipo);
  }

  atualizaTipo(){
    this.configuracoes[this.colunaConf].tipo = this.tipo
  }

  novaColunaConfNome(){
    this.configuracoes[this.colunaConf].nome = this.colunaConfNome;
  }


  teste(){
    console.log("teste");
  }

}
