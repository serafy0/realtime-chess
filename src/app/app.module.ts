import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChessBoardsComponent } from './components/chess-boards/chess-boards.component';

import { NgxChessBoardModule } from 'ngx-chess-board';

import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { HomeComponent } from './components/home/home.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { OnlineComponent } from './components/online/online.component';

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
    path: 'single-board/',
    component: BoardComponent,
  },
  {
    path: 'single-board/dark',
    component: BoardComponent,
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'online-game/:code',
    component: OnlineComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    ChessBoardsComponent,
    BoardComponent,
    HomeComponent,
    OnlineComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChessBoardModule.forRoot(),
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
