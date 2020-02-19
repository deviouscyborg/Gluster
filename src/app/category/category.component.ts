import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GamesService} from '~/app/games/games.service';
import * as application from "tns-core-modules/application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/platform";
import {Router} from '@angular/router';
import {Game1} from '~/app/games/games.model';

export interface category {
    name: string,
    image: string
    }

@Component({
  selector: 'ns-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    categories: category[];
    isLoading= true;
    games: Game1[];
    @Output() showGamesValueChange = new EventEmitter<boolean>();
    @Input() showGames= false;


  constructor(private gamesService: GamesService,
              private cd: ChangeDetectorRef,
              private router: Router) { }

  ngOnInit() {
      this.isLoading = false;
      this.categories = [
          {name: "Adventure",image: ""},
          {name: "Action",image: ""},
          {name: "Card",image: ""},
          {name: "Casino",image: ""},
          {name: "Dice",image: ""},
          {name: "Board",image: ""},
          {name: "Girls",image: ""},
          {name: "Arcade",image: ""},
          {name: "Family",image: ""},
          {name: "Educational",image: ""},
          {name: "Pairs",image: ""},
          {name: "Music",image: ""},
          {name: "Puzzle",image: ""},
          {name: "Role Playing",image: ""},
          {name: "Racing",image: ""},
          {name: "Multiplayer",image: ""},
          {name: "Strategy",image: ""},
          {name: "Shooting",image: ""},
          {name: "Simulation",image: ""},
          {name: "Jump&Run",image: ""},
          {name: "Sports",image: ""},
          {name: "Hidden Object",image: ""},
          {name: "Kids",image: ""},
          {name: "Trivia",image: ""},
          {name: "Match 3",image: ""},
          {name: "Word",image: ""}];
  }


    loadGames(category: string) {
      this.isLoading = true;
      this.gamesService
          .getGames(""+category)
          .subscribe( (response: Game1[]) => {
              this.isLoading = false;
              this.games = response;
              this.showGames = true;
              this.showGamesValueChange.emit(this.showGames);
          }, error => {
              this.isLoading = false;
              console.log(error);
          });
    }

}
