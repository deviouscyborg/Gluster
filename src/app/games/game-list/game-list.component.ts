import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {Game1} from '~/app/games/games.component';
import {Router} from '@angular/router';
import {StorageService} from '~/app/shared/storage.service';
import {ModalDialogService} from 'nativescript-angular/modal-dialog'
import {ModalComponent} from '~/app/shared/modal/modal.component';

@Component({
  selector: 'ns-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
    @Input() games: Game1[];

  constructor(private router: Router,
              private favService: StorageService,
              private modal: ModalDialogService,
              private vcRef: ViewContainerRef ) { }

  ngOnInit() {
  }

  playGame(item: Game1) {
    this.favService.setRecentlyPlayed(item);
    // this.router.navigate(['games/play'], { queryParams: { url: item.link } });
  }

  showModal(item: Game1) {
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
