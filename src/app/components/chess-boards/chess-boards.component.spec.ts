import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessBoardsComponent } from './chess-boards.component';

describe('ChessBoardsComponent', () => {
  let component: ChessBoardsComponent;
  let fixture: ComponentFixture<ChessBoardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChessBoardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
