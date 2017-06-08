import { Component, OnInit } from '@angular/core';
import {ReversePipe} from 'ngx-pipes/src/app/pipes/array/reverse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = `Teste`;

  constructor() { }

  ngOnInit() {
  }

}
