import { InserirComponent } from './inserir/inserir.component';
import { TabelaComponent } from './tabela/tabela.component';
import { TabelasComponent } from './tabelas/tabelas.component';
import { TabelaConsultaComponent } from './tabela-consulta/tabela-consulta.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'inserir',
    component: InserirComponent
  },
  {
    path: 'tabela/:nome',
    component: TabelaComponent
  },
  {
    path: 'tabelas',
    component: TabelasComponent
  },
  {
    path: 'tabela-consulta/:nome',
    component: TabelaConsultaComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
