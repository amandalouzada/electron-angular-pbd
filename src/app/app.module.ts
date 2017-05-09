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

import { TabelaService } from './providers/tabela.service';
import { KeysPipe } from './keys.pipe';
import { ObjetoPipe } from './objeto.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InserirComponent,
    KeysPipe,
    ObjetoPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    AppRoutingModule
  ],
  providers: [
    ElectronService,
    TabelaService,
    Uploader
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
