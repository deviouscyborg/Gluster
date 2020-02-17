import { Component, OnInit } from '@angular/core';
import { SearchBar } from "tns-core-modules/ui/search-bar";
import {GamesService} from '~/app/games/games.service';
import {Router} from '@angular/router';
import {StorageService} from '~/app/shared/storage.service';
import * as application from 'tns-core-modules/application';
import {AndroidApplication} from 'tns-core-modules/application';
import {AndroidActivityBackPressedEventData} from 'tns-core-modules/application';
import {isAndroid} from '@nativescript/core';
import {Game1} from '~/app/games/games.model';

@Component({
  selector: 'ns-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    searchPhrase: string;
    private isLoading= false;
    games: Game1[];
    recentGames: Game1[];
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
            console.log(`Searching for ${searchBar.text}`);
        }
    }

    onTextChanged(args) {
        // const searchBar = args.object as SearchBar;
        // if(searchBar.text.length === 0) {
        //     this.isSearchBarEmpty = true;
        // }
        // console.log(`Input changed! New value: ${searchBar.text}`);
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

    searchGames(title: string) {
        this.gamesService
            .getGames("", "", ""+title)
            .subscribe( (response: Game1[]) => {
                this.isLoading = false;
                this.games = response;
            }, error => {
                this.isLoading = false;
                console.log(error);
            });
    }

}
