import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ns-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss']
})
export class GamePlayComponent implements OnInit {
    game_url: string;
    isLoading=false;
    // isLoading=true;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
      this.activatedRoute.queryParams.subscribe( params => {
          this.game_url = params.url;
      });
  }

  onLoadFinished() {
      this.isLoading=false;
  }

}
