import {
  Component,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import {
  MoveChange,
  NgxChessBoardComponent,
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

  checkIfCorrectlyReversed(): void {
    if (!this.reversed && this.shouldBeReversed) {
      if (this.board) {
        this.board?.reverse();
        this.reversed = true;
      }
    }
  }

  sendBoardData(fen: string | undefined, move: MoveChange): void {
    let sendTo = 'white';
    if (this.darkDisabled) {
      sendTo = 'dark';
    }
    window?.top?.postMessage({ fen: fen, sendTo: sendTo, move: move });
  }

  @HostListener('window:message', ['$event'])
  onMessage(event: any) {
    if (event.origin !== origin) {
      return;
    }
    if (event.data) {
      this.board?.move(event.data.move.move);
    }
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
    localStorage.setItem('currentFEN', <string>this.board?.getFEN());
  }
}
