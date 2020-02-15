import { Injectable } from '@angular/core';
import * as appSettings from '@nativescript/core/application-settings'
import {Game1} from '~/app/games/games.component';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
    favourites: Game1[];

  constructor() {
      this.favourites = JSON.parse(appSettings.getString('favourite-games') || '[]');
  }

  private updateFavourites() {
      appSettings.setString('favourite-games', JSON.stringify(this.favourites))
  }

  private getFavourites() {
      return this.favourites;
  }
 }
