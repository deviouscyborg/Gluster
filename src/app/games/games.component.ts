import { Component, OnInit } from '@angular/core';
import {GamesService} from '~/app/games/games.service';
import {Router} from '@angular/router';
import {Page} from '@nativescript/core';
import {StorageService} from '~/app/shared/storage.service';
import {Game1} from '~/app/games/games.model';


@Component({
  selector: 'ns-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
    isLoading = true;

  constructor(private gamesService: GamesService,
              private router: Router,
              private page: Page,
              private favService: StorageService) { }
  games: Game1[];
  gamesNew: Game1[];

  ngOnInit() {
      // this.page.actionBarHidden = true;
      this.gamesService.getGames()
          .subscribe( (response: Game1[]) => {
              this.isLoading = false;
              this.games = response;
              console.log('----', this.games);
              }, error => {
              this.isLoading = false;
              console.log(error);
          });

      this.gamesService.getNewGames()
          .subscribe( (response: Game1[]) => {
              this.isLoading = false;
              this.gamesNew = response;
              console.log('----', this.games);
          }, error => {
              this.isLoading = false;
              console.log(error);
          });
  }

    playGame(item: Game1) {
        this.favService.setRecentlyPlayed(item);
        this.router.navigate(['games/play'], { queryParams: { url: item.link } });
    }

}
