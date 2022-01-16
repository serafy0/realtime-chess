import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MoveChange } from 'ngx-chess-board';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-chess-boards',
  templateUrl: './chess-boards.component.html',
  styleUrls: ['./chess-boards.component.css'],
})
export class ChessBoardsComponent implements OnInit {
  url: string = origin + '/single-board';
  urlSafeDark: SafeResourceUrl = '';
  urlSafeWhite: SafeResourceUrl = '';

  constructor(public sanitizer: DomSanitizer) {}

  sendNewBoardDataToChild(color: string, move: MoveChange): void {
    const myIframe: HTMLIFrameElement = document.getElementById(
      color
    ) as HTMLIFrameElement;
    myIframe?.contentWindow?.postMessage(
      { move: move },
      this.url + `/${color}`
    );
  }
  @HostListener('window:message', ['$event'])
  onMessage(event: any) {
    if (event.data) {
      this.sendNewBoardDataToChild(event.data.sendTo, event.data.move);
    }
  }

  ngOnInit(): void {
    this.urlSafeWhite = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.url + '/white'
    );
    this.urlSafeDark = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.url + '/dark'
    );
  }
}
