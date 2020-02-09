import { Component, OnInit } from '@angular/core';
import { SearchBar } from "tns-core-modules/ui/search-bar";
import {GamesService} from '~/app/games/games.service';
import {Game1} from '~/app/games/games.component';

@Component({
  selector: 'ns-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    searchPhrase: string;
    private isLoading= false;
    games: Game1[];


  constructor(private gamesService: GamesService) { }

  ngOnInit() {
  }

    onSubmit(args) {
        this.isLoading = true;
        const searchBar = args.object as SearchBar;
        this.searchGames(searchBar.text);
        console.log(`Searching for ${searchBar.text}`);
    }

    onTextChanged(args) {
        const searchBar = args.object as SearchBar;
        console.log(`Input changed! New value: ${searchBar.text}`);
    }

    onClear(args) {
        const searchBar = args.object as SearchBar;
        this.searchGames(searchBar.text);
        console.log(`Clear event raised`);
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

    playGame(game) {

    }
}
