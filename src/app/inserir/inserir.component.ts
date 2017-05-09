import { Component, OnInit } from '@angular/core';
import { Uploader }      from 'angular2-http-file-upload';
import { MyUploadItem }  from './my-upload-item';
import { TabelaService } from '../providers/tabela.service';


@Component({
  selector: 'app-inserir',
  templateUrl: './inserir.component.html',
  styleUrls: ['./inserir.component.scss']
})
export class InserirComponent implements OnInit {

  private cabecalho: string[] = [];
  private linhas: any = {};
  private registros: any;

  constructor(public uploaderService: Uploader, public tabelaService: TabelaService) {
  }

  ngOnInit() {
  }


    upload() {
          let uploadFile = (<HTMLInputElement>window.document.getElementById('upload')).files[0];

          console.log(uploadFile);

          let myUploadItem = new MyUploadItem(uploadFile);
          myUploadItem.formData = { FormDataKey: 'uploadFile' };
  // (optional) form data can be sent with file

          this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
               // success callback
          };
          this.uploaderService.onCompleteUpload = (item, response, status, headers) => {
               // complete callback, called regardless of success or failure
          };

          this.uploaderService.upload(myUploadItem);
    }

    getCabecalho(){
      console.log("fd");
      this.tabelaService.getHeader("tab_nova")
        .then((res) =>{
          if(res)
            for( var key in res[0]) {
              this.cabecalho.push(key);
            }
        }, (error) => {
          console.log(error);
        })
    }

    getLinhas(pagina){
      this.tabelaService.getAll(pagina).then((res) =>{
        if(res)
          this.linhas=res;
          console.log(this.linhas);
      }, (error) => {
        console.log(error);
      })
    }

    getRegistros(){
      this.tabelaService.getQtd("tab_nova").then((res) =>{
        if(res)
          this.registros= res;
      }, (error) => {
        console.log(error);
      })
    }

}
