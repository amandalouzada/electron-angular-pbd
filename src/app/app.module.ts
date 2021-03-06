import 'zone.js';
import 'reflect-metadata';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { AppRoutingModule } from './app-routing.module';

import { ElectronService } from './providers/electron.service';
import { InserirComponent } from './inserir/inserir.component';

import { Uploader }      from 'angular2-http-file-upload';


import { MaterializeModule } from "angular2-materialize";
import { NgPipesModule } from 'ngx-pipes';
import { TabelaService } from './providers/tabela.service';
import { KeysPipe } from './keys.pipe';
import { ObjetoPipe } from './objeto.pipe';
import { TabelasComponent } from './tabelas/tabelas.component';
import { TabelaComponent } from './tabela/tabela.component';
import { TabelaConsultaComponent } from './tabela-consulta/tabela-consulta.component';
import { PaginacaoComponent } from './paginacao/paginacao.component';

import { ReversePipe } from 'ngx-pipes/src/app/pipes/array/reverse';
import { HotTableModule } from 'ng2-handsontable';
import { ColunaComponent } from './coluna/coluna.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InserirComponent,
    KeysPipe,
    ObjetoPipe,
    TabelasComponent,
    TabelaComponent,
    TabelaConsultaComponent,
    PaginacaoComponent,
    ColunaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    NgPipesModule,
    HotTableModule,
    AppRoutingModule
  ],
  providers: [
    ElectronService,
    TabelaService,
    ReversePipe,
    Uploader
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
