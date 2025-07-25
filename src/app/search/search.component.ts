import {Component, Input, OnInit} from '@angular/core';
import { SearchBar } from "tns-core-modules/ui/search-bar";
import {GamesService} from '~/app/games/games.service';
import {Router} from '@angular/router';
import {StorageService} from '~/app/shared/storage.service';
import * as application from 'tns-core-modules/application';
import {AndroidApplication} from 'tns-core-modules/application';
import {AndroidActivityBackPressedEventData} from 'tns-core-modules/application';
import {isAndroid} from '@nativescript/core';
import {game} from '~/app/games/games.model';

@Component({
  selector: 'ns-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    searchPhrase: string;
    isLoading= false;
    @Input() games: game[];
    displayGames: game[] = [];
    recentGames: game[];
    isSearchBarEmpty= true;

  constructor(private gamesService: GamesService,
              private favService: StorageService) { }

  ngOnInit() {
      this.recentGames= this.favService.getRecentlyPlayed();
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

    onSubmit(args) {
        this.isLoading = true;
        const searchBar = args.object as SearchBar;
        searchBar.dismissSoftInput();
        if(!searchBar.text.length) {
            this.isSearchBarEmpty = true;
        } else {
            this.isSearchBarEmpty = false;
            this.searchGames(searchBar.text);
        }
    }

    onTextChanged(args) {
        // const searchBar = args.object as SearchBar;
        // if(searchBar.text.length === 0) {
        //     this.isSearchBarEmpty = true;
        // } else {
        //     this.isSearchBarEmpty = false;
        //     this.searchGames(searchBar.text);
        //     console.log(`Searching for ${searchBar.text}`);
        // }
    }

    onClear(args) {
        const searchBar = args.object as SearchBar;
        if(searchBar.text.length === 0) {
            this.isSearchBarEmpty = true;
        } else {
            this.isSearchBarEmpty = false;
            this.searchGames(searchBar.text);
            console.log(`Clear event raised`);
        }
    }

    searchGames(query: string) {
      this.displayGames = this.games.filter(game => {
          if (game.name.toString().toLowerCase().includes(query.toLowerCase())) {
              this.isLoading = false;
              return game;
          } else {
              this.isLoading = false;
          }
      });
      if (!this.displayGames.length) {
          console.log('Game not found');
      }
    }

}
