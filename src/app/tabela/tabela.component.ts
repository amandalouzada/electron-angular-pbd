import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { TabelaService } from '../providers/tabela.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {
  private tabela: any;
  private collectionName: any;
  inscricao: Subscription;
  private cabecalho: any={};
  private qtdRegistros: any = {};
  private qtd:any;
  private sort: any={};

  constructor(private route: ActivatedRoute,
     private router: Router,
     private tabelaService: TabelaService) {
       this.sort ={parametro:'_id', ordem:-1};
     }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.collectionName = params['nome'];

        this.tabelaService.getHeader(this.collectionName)
          .then((res)=>{
            if(res)
              this.cabecalho = res[0];
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

}
