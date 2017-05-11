import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./paginacao.component.scss']
})
export class PaginacaoComponent implements OnInit {

  public static readonly QTD_POR_PAGINA: number =20;
  public static readonly PAGINA: number =1;
  public static readonly REGISTROS: number = 0;
  public static readonly ADJACENTES: number = 0;

  @Input() qtdPorPagina: number;
  @Input() totalRegistros: number;
  @Input() qtdAdjacentes: number;
  @Output() onPaginate: EventEmitter<number> = new EventEmitter<number>();


  pagina: number;
  paginas: Array<number>;
  exibirProximo: boolean;
  qtdPaginas: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

  }
  ngOnChanges(changeRecord) {
      this.qtdAdjacentes = this.qtdAdjacentes || PaginacaoComponent.ADJACENTES;
      this.qtdPorPagina = this.qtdPorPagina || PaginacaoComponent.QTD_POR_PAGINA;
      this.pagina = +this.route.snapshot.queryParams['pagina'] || PaginacaoComponent.PAGINA;
      this.totalRegistros = this.totalRegistros || PaginacaoComponent.REGISTROS;
      this.qtdPaginas = Math.ceil(this.totalRegistros/this.qtdPorPagina);
      this.gerarLinks();
    }

  gerarLinks() {
    this.exibirProximo = this.qtdPaginas !== this.pagina;
    this.paginas=[]
    let iniAdjacente = (this.pagina - this.qtdAdjacentes <= 0) ? 1 :
                       (this.pagina - this.qtdAdjacentes);
    let fimAdjacente = (this.pagina + this.qtdAdjacentes >= this.qtdPaginas) ? this.qtdPaginas :
                       (this.pagina + this.qtdAdjacentes);

    for ( let i= iniAdjacente; i<=fimAdjacente; i++ ) {
        this.paginas.push(i);
    }
  }

  paginar(pagina: number, $event: any) {
    $event.preventDefault();
    this.pagina = pagina;
    console.log(this.totalRegistros);
    this.gerarLinks();
    this.onPaginate.emit(pagina);
  }

}
