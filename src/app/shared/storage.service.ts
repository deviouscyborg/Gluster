import { Injectable } from '@angular/core';
import * as appSettings from '@nativescript/core/application-settings'
import {Game1} from '~/app/games/games.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
    favouriteGames: Game1[];
    recentGames: Game1[];

  constructor() {
      this.favouriteGames = JSON.parse(appSettings.getString('favourite-games') || '[]');
      this.recentGames = JSON.parse(appSettings.getString('recently-played') || '[]');
  }

  updateFavourites(favGame: Game1) {
      if(this.favouriteGames.indexOf(favGame) === -1) {
        // this.favouriteGames.push(favGame);
        this.favouriteGames.unshift(favGame);
        appSettings.setString('favourite-games', JSON.stringify(this.favouriteGames));
      } else {
          this.favouriteGames.splice(this.favouriteGames.indexOf(favGame),1);
          appSettings.setString('favourite-games', JSON.stringify(this.favouriteGames));
      }
  }

  isFavourite(game: Game1) {
      return this.favouriteGames.indexOf(game) !== -1;
  }

  getFavourites() {
      return this.favouriteGames;
  }

    setRecentlyPlayed(recentGame: Game1) {
      if(this.recentGames.indexOf(recentGame) === -1) {
        // this.recentGames.push(recentGame);
        this.recentGames.unshift(recentGame);
        appSettings.setString('recently-played', JSON.stringify(this.recentGames));
      }
    }

    getRecentlyPlayed() {
        return this.recentGames;
    }
 }
