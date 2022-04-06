import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import { Observable, first } from 'rxjs';

import {
  MoveChange,
  NgxChessBoardService,
  NgxChessBoardView,
} from 'ngx-chess-board';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.css'],
})
export class OnlineComponent implements OnInit {
  codeId: any;
  currentGame: any;
  gameRef: any;
  game: Observable<any>;
  authState: any;

  @ViewChild('board', { static: false }) board: NgxChessBoardView | undefined;
  @Input() lightDisabled = false;
  @Input() darkDisabled = true;
  @Input() reversed = true;
  @Input() shouldBeReversed = false;

  constructor(
    private actRoute: ActivatedRoute,
    db: AngularFireDatabase,
    public auth: AngularFireAuth
  ) {
    this.codeId = this.actRoute.snapshot.params['code'];
    this.gameRef = db.object(`games/${this.codeId}`);
    this.game = db.object(`games/${this.codeId}`).valueChanges();
    this.game.subscribe((action) => {
      this.currentGame = action;

      if (this.board?.getMoveHistory().length === 0) {
        this.board?.setFEN(action?.lastMove.fen);
        this.getUser();
      }
      this.board?.move(action?.lastMove.move);
      if (action?.lastMove?.checkmate) {
        alert('game ended');
      }
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): any {
    this.authState = this.auth.authState.subscribe((user) => {
      if (user && user.uid) {
        this.authState = user;
      } else {
        this.auth.signInAnonymously();
      }
      this.authState = user;
      this.setUserToColor();
    });

    return this.authState;
  }

  moveCallback(move: MoveChange): void {
    this.gameRef.update({ lastMove: move });
  }

  setUserToColor() {
    if (this.currentGame && this.authState?.uid === this.currentGame?.white) {
      this.lightDisabled = false;
    } else if (this.currentGame && !this.currentGame?.white) {
      this.gameRef.update({ white: this.authState.uid });
      this.lightDisabled = false;
    } else if (
      this.authState &&
      this.currentGame &&
      this.authState?.uid === this.currentGame?.black
    ) {
      this.board?.reverse();
      this.darkDisabled = false;
    } else if (this.authState && this.currentGame && !this.currentGame?.black) {
      this.gameRef.update({ black: this.authState.uid });
      this.darkDisabled = false;
    }
  }
  login() {
    this.auth.signInAnonymously();
  }
}
