import { Component, OnInit } from '@angular/core';
import {GamesService} from '~/app/games/games.service';
import {Router} from '@angular/router';
import {Page} from '@nativescript/core';

export interface Game {
    "package_id": string,
    "name": string,
    "description": string,
    "thumb": string,
    "thumb_60": string,
    "thumb_120": string,
    "thumb_180": string,
    "link": string,
    "date": string,
    "aspect_ratio": number,
    "related": gameQuick[],
    "categories": string[],
    "orientation": string,
    "highscores_enabled": false
}

export interface gameQuick {
        "id": string,
        "name": string,
        "thumb": string
}

@Component({
  selector: 'ns-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
    isLoading = true;

  constructor(private gamesService: GamesService,
              private router: Router,
              private page: Page) { }
  games: Game[];

  ngOnInit() {
      this.page.actionBarHidden = true;
      this.gamesService.getGames()
          .subscribe( (response: {games: Game[]}) => {
              this.isLoading = false;
              this.games=response.games;
              console.log('----', response);
              }, error => {
              this.isLoading = false;
              console.log(error);
          });
  }

    playGame(item: Game) {
        this.router.navigate(['games/play'], { queryParams: { url: item.link } });
    }

}
