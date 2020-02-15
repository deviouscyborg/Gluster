import {Component, Input, OnInit} from '@angular/core';
import {Game1} from '~/app/games/games.component';
import {Router} from '@angular/router';
import {StorageService} from '~/app/shared/storage.service';

@Component({
  selector: 'ns-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
    @Input() games: Game1[];

  constructor(private router: Router,
              private favService: StorageService) { }

  ngOnInit() {
  }

    playGame(item: Game1) {
        this.favService.setRecentlyPlayed(item);
        this.router.navigate(['games/play'], { queryParams: { url: item.link } });
    }
}
