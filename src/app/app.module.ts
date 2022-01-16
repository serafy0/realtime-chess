import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChessBoardsComponent } from './components/chess-boards/chess-boards.component';

import { NgxChessBoardModule } from 'ngx-chess-board';

import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';

const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'board',
    component: ChessBoardsComponent,
  },
  {
    path: 'single-board/white',
    component: BoardComponent,
  },
  {
    path: 'single-board/dark',
    component: BoardComponent,
  },
];

@NgModule({
  declarations: [AppComponent, ChessBoardsComponent, BoardComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChessBoardModule.forRoot(),
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
