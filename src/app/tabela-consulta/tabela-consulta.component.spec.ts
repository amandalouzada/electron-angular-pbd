import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaConsultaComponent } from './tabela-consulta.component';

describe('TabelaConsultaComponent', () => {
  let component: TabelaConsultaComponent;
  let fixture: ComponentFixture<TabelaConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
