import { Injectable } from '@angular/core';
import * as appSettings from '@nativescript/core/application-settings'
import {Game1} from '~/app/games/games.component';

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
        this.favouriteGames.push(favGame);
        appSettings.setString('favourite-games', JSON.stringify(this.favouriteGames));
      }
  }

  getFavourites() {
      return this.favouriteGames;
  }

    setRecentlyPlayed(recentGame: Game1) {
      if(this.recentGames.indexOf(recentGame) === -1) {
        this.recentGames.push(recentGame);
        appSettings.setString('recently-played', JSON.stringify(this.recentGames));
      }
    }

    getRecentlyPlayed() {
        return this.recentGames;
    }
 }
