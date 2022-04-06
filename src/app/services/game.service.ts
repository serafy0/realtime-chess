import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { MoveChange } from 'ngx-chess-board';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private allGames: any;

  games: AngularFireList<any>;
  constructor(db: AngularFireDatabase) {
    this.games = db.list('games');
    this.allGames = db.list('games').snapshotChanges();
  }

  public createNewGame(name: string) {
    this.games.push({
      name: name,
    });
  }
  public deleteGame(id: any) {
    this.games.remove(id);
  }

  public getAllGames() {
    return this.allGames;
  }
}
