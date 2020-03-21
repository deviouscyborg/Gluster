import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GamesService} from '~/app/games/games.service';
import * as application from "tns-core-modules/application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/platform";
import {Router} from '@angular/router';
import {game} from '~/app/games/games.model';
import {CommunicationService} from '~/app/shared/communication.service';

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
    games: game[];
    showGames= false;
    currentCategory : string = 'Category';


  constructor(private gamesService: GamesService,
              private cd: ChangeDetectorRef,
              private router: Router,
              private comm: CommunicationService) { }

  ngOnInit() {
      this.isLoading = false;
      this.categories = [
          {name: "Adventure",image: "~/assets/images/adventure.png"},
          {name: "Action",image: "~/assets/images/action.png"},
          {name: "Card",image: "~/assets/images/card.png"},
          {name: "Casino",image: "~/assets/images/casino.png"},
          {name: "Dice",image: "~/assets/images/dice.png"},
          {name: "Board",image: "~/assets/images/board.png"},
          {name: "Girls",image: "~/assets/images/girls.png"},
          {name: "Arcade",image: "~/assets/images/arcade.png"},
          {name: "Family",image: "~/assets/images/family.png"},
          {name: "Educational",image: "~/assets/images/educational.png"},
          {name: "Pairs",image: "~/assets/images/pairs.png"},
          {name: "Music",image: "~/assets/images/music.png"},
          {name: "Puzzle",image: "~/assets/images/puzzle.png"},
          {name: "Role Playing",image: "~/assets/images/roleplaying.png"},
          {name: "Racing",image: "~/assets/images/racing.png"},
          // {name: "Multiplayer",image: "~/assets/images/multiplayer.png"},
          {name: "Strategy",image: "~/assets/images/strategy.png"},
          {name: "Shooting",image: "~/assets/images/shooting.png"},
          {name: "Simulation",image: "~/assets/images/simulation.png"},
          {name: "Jump&Run",image: "~/assets/images/jumpnrun.png"},
          {name: "Sports",image: "~/assets/images/sports.png"},
          {name: "Hidden Object",image: "~/assets/images/hiddenobject.png"},
          {name: "Kids",image: "~/assets/images/kids.png"},
          {name: "Trivia",image: "~/assets/images/trivia.png"},
          {name: "Match 3",image: "~/assets/images/match3.png"},
          {name: "Word",image: "~/assets/images/word.png"}];

      this.comm.catDisplayGames.subscribe(res => {
          this.showGames = res;
          this.cd.detectChanges();
      });
  }

    loadGames(category: string) {
      this.currentCategory = category;
      this.isLoading = true;
      // this.gamesService
      //     .getGames(""+category)
      //     .subscribe( (response: Game1[]) => {
      //         this.isLoading = false;
      //         this.games = response;
      //         this.showGames= true;
      //         this.comm.catDisplayGames.next(this.showGames);
      //     }, error => {
      //         this.isLoading = false;
      //         console.log(error);
      //     });
        this.gamesService.getAllGames()
            .then(res => {
                    this.games = res.value;
                    this.isLoading = false;
                    this.showGames= true;
                    this.comm.catDisplayGames.next(this.showGames);
                }
            )
            .catch(error => {
                this.isLoading = false;
                console.log(error);
            });
    }

}
