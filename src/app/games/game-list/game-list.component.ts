import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {StorageService} from '~/app/shared/storage.service';
import {ModalDialogService} from 'nativescript-angular/modal-dialog'
import {ModalComponent} from '~/app/shared/modal/modal.component';
import {game, Game1} from '~/app/games/games.model';

@Component({
  selector: 'ns-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
    @Input() games: game[];

  constructor(private router: Router,
              private favService: StorageService,
              private modal: ModalDialogService,
              private vcRef: ViewContainerRef ) { }

  ngOnInit() {
  }

  playGame(item: game) {
    this.favService.setRecentlyPlayed(item);
    // this.router.navigate(['games/play'], { queryParams: { url: item.link } });
  }

  showModal(item: game) {
      let options = {
          context: {game: item},
          fullscreen: false,
          viewContainerRef: this.vcRef
      };
      this.modal.showModal(ModalComponent, options).then(response => {
          console.log(response);
      });
  }
}
