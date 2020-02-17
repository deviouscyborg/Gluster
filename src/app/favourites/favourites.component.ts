import { Component, OnInit } from '@angular/core';
import {StorageService} from '~/app/shared/storage.service';
import {AndroidActivityBackPressedEventData, AndroidApplication, isAndroid} from '@nativescript/core';
import * as application from 'tns-core-modules/application';
import {Game1} from '~/app/games/games.model';

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
      if(isAndroid) {
          this.backButtonPressed();
      }
  }

    backButtonPressed() {
        application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            if (true) {
                data.cancel = true; // prevents default back button behavior
            }
        });
    }

}
