import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  MoveChange,
  NgxChessBoardService,
  NgxChessBoardView,
} from 'ngx-chess-board';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  @ViewChild('board', { static: false }) board: NgxChessBoardView | undefined;
  @Input() lightDisabled = true;

  @Input() darkDisabled = true;
  @Input() reversed = false;
  @Input() shouldBeReversed = false;
  @Input() gameFinished = false;

  checkIfCorrectlyReversed(): void {
    if (!this.reversed && this.shouldBeReversed) {
      if (this.board) {
        this.board?.reverse();
        this.reversed = true;
      }
    }
  }

  getColorToSendTo(): string {
    let sendTo = 'white';
    if (this.darkDisabled) {
      sendTo = 'dark';
    }
    return sendTo;
  }

  sendBoardData(fen: string | undefined, move: MoveChange): void {
    let sendTo = this.getColorToSendTo();
    if (move.checkmate) {
      this.gameFinished = true;
      alert('checkmate');
    }
    if (move.stalemate) {
      this.gameFinished = true;
      alert('stalemate');
    }
    window?.top?.postMessage({ fen: fen, sendTo: sendTo, move: move });
  }

  resetGame() {
    let sendTo = this.getColorToSendTo();

    this.board?.reset();
    if (sendTo === 'white') {
      this.board?.reverse();
    }
  }

  startAnewGame() {
    let sendTo = this.getColorToSendTo();

    if (window.confirm('Do you really want to reset?')) {
      window?.top?.postMessage({ reset: true, sendTo });
      this.resetGame();
    }
  }

  @HostListener('window:message', ['$event'])
  onMessage(event: any) {
    if (event.origin !== origin) {
      return;
    }
    if (event.data.reset) {
      this.resetGame();
    }

    if (event.data.move) {
      this.board?.move(event.data.move.move);
    }

    console.log(event.data.reset);
  }

  moveCallback(move: MoveChange): void {
    const fen = this.board?.getFEN();
    this.sendBoardData(fen, move);
  }

  constructor(
    private ngxChessBoardService: NgxChessBoardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.router.url === '/single-board/dark') {
      this.darkDisabled = false;
      this.shouldBeReversed = true;
    } else {
      this.lightDisabled = false;
    }
  }

  ngAfterViewInit() {
    const currentFEN = localStorage.getItem('currentFEN');
    if (typeof currentFEN === 'string') {
      this.board?.setFEN(currentFEN);
    }
    this.checkIfCorrectlyReversed();
  }

  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    if (!this.gameFinished) {
      localStorage.setItem('currentFEN', <string>this.board?.getFEN());
    }
  }
}
