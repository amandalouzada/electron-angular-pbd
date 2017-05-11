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


  constructor(public uploaderService: Uploader, public tabelaService: TabelaService) {
  }

  ngOnInit() {
  }


    upload() {
          let uploadFile = (<HTMLInputElement>window.document.getElementById('upload')).files[0];
          let nome = uploadFile.name.split('.');

          let myUploadItem = new MyUploadItem(uploadFile, nome[0]);
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

    uploadJ() {
          let uploadFile = (<HTMLInputElement>window.document.getElementById('uploadJ')).files[0];
          let nome = uploadFile.name.split('.');

          let myUploadItem = new MyUploadItem(uploadFile, nome[0]);
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

}
