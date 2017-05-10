import { Component, OnInit } from '@angular/core';
import { TabelaService } from '../providers/tabela.service';


@Component({
  selector: 'app-tabelas',
  templateUrl: './tabelas.component.html',
  styleUrls: ['./tabelas.component.scss']
})
export class TabelasComponent implements OnInit {

  private tabelas : any =[];
  constructor(public tabelaService: TabelaService) {
    this.tabelaService.getTabelas()
      .then((res)=>{
        this.tabelas = res;
        console.log(this.tabelas);
      }, (error)=>{
        console.log(error);
      })
  }

  ngOnInit() {
  }

}
