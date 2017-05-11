import { UploadItem } from 'angular2-http-file-upload';

export class MyUploadItem extends UploadItem {
    constructor(file: any, nome: string) {
        super();
        this.url = 'http://localhost:3000/upload/'+nome;
        this.headers = { 'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'XMLHttpRequest,content-type',
          'Access-Control-Allow-Credentials': true
        };
        this.file = file;
    }
}
