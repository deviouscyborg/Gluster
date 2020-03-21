import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
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
    @Input() games: game[];
    displayGames: game[] = [];
    showGames= false;
    currentCategory : string = 'Category';


  constructor(private gamesService: GamesService,
              private cd: ChangeDetectorRef,
              private router: Router,
              private comm: CommunicationService) { }

  ngOnInit() {
      this.isLoading = true;
      this.gamesService.getCategories()
          .then(res => {
              this.categories = res;
              this.isLoading = false;
          }
      )
          .catch(error => {
              this.isLoading = false;
              console.log(error);
          });
      this.comm.catDisplayGames.subscribe(res => {
          this.showGames = res;
          this.cd.detectChanges();
      });
  }

    loadGames(category: string) {
      this.currentCategory = category;
      this.isLoading = true;
        this.displayGames = this.games.filter(game => {
            if (game.categories){
                if (game.categories.toString().toLowerCase().includes(category.toLowerCase())) {
                    this.isLoading = false;
                    this.showGames= true;
                    this.comm.catDisplayGames.next(this.showGames);
                    return game;
                }
            } else {
                this.showGames= true;
                this.comm.catDisplayGames.next(this.showGames);
                this.isLoading = false;
            }
        });
    }

}
