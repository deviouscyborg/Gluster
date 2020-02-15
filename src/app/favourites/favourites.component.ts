import { Component, OnInit } from '@angular/core';
import {StorageService} from '~/app/shared/storage.service';
import {Game1} from '~/app/games/games.component';

@Component({
  selector: 'ns-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
    games: Game1[];

  constructor(private favService: StorageService) { }

  ngOnInit() {
      this.games = this.favService.getFavourites();
  }

}
