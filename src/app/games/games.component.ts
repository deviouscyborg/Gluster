import { Component, OnInit } from '@angular/core';
import {GamesService} from '~/app/games/games.service';

export interface Game {
    id: string,
    title: string,
    creation: string,
    featured: boolean,
    height: number,
    width: number,
    orientation: string,
    responsive: boolean,
    author: string,
    rkScore: number,
    rks: number,
    thumbnailUrl: string,
    thumbnailUrl100: string,
    url: string,
    touch: boolean,
    hwcontrols: boolean,
    lastUpdate: string,
    description: string,
    category: string,
    categories: string[],
    desc_it: string,
    desc_en: string,
    desc_fr: string,
    desc_de: string,
    desc_es: string,
    size: number,
    min_android_version: number,
    min_ios_version: number,
    min_wp_version: number,
    approval_date: string
}

@Component({
  selector: 'ns-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
    isLoading = true;

  constructor(private gamesService: GamesService) { }
  games: Game[];

  ngOnInit() {
      this.gamesService.getGames()
          .subscribe( (response: {data: Game[]}) => {
              this.isLoading = false;
              this.games=response.data;
              console.log(this.games[0]);
              }, error => {
              this.isLoading = false;
              console.log(error);
          });
  }

}
