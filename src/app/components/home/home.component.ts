import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allGames: any;

  constructor(private gameService: GameService, public router: Router) {
    this.allGames = gameService.getAllGames();
  }

  ngOnInit(): void {}

  async createNewGame() {
    const game = this.gameService.createNewGame('chess-game');
    this.router.navigate([`/online-game/${game.key}`]);
  }

  deleteGame(id: any) {
    this.gameService.deleteGame(id);
  }
}
