import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy, ElementRef } from '@angular/core';

@Component({
  selector: 'app-coluna',
  templateUrl: './coluna.component.html',
  styleUrls: ['./coluna.component.scss']
})
export class ColunaComponent implements OnInit {

  @Input() valor: any;
  @Input() arrayChaveValor: any = [];

  private valorComMascara;
  //
  // "mascaras": [
  //               {
  //                   "chave": "",
  //                   "valor": "",
  //                   "valores": {
  //                       "avulso": [],
  //                       "intervalos": []
  //                   }
  //               }
  //           ]

  constructor() { }

  ngOnInit() {
    console.log(this.valor);
    console.log(this.arrayChaveValor);

      for(let mascara of this.arrayChaveValor) {
        if (this.valor == mascara.chave) {
          this.valorComMascara = mascara.valor
        } else {
            this.valorComMascara = this.valor;
        }
      }
  }

}
