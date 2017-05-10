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

  constructor(private route: ActivatedRoute,
     private router: Router,
     private tabelaService: TabelaService) { }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.collectionName = params['nome'];

        this.tabelaService.getHeader(this.collectionName)
          .then((res)=>{
            if(res)
              this.cabecalho = res[0];
              console.log(this.cabecalho);
          },(error)=>{
            console.log(error);
          })

        this.tabelaService.getCollectionPaginada(1,this.collectionName)
          .then((res)=>{
            this.tabela = res;
            console.log(this.tabela);
          },(error)=>{
            console.log(error);
          })
      }
    )

  }


  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

  teste($event: any){
    console.log("proxima");
  }

}
