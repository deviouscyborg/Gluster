import { Component, OnInit } from '@angular/core';
import {ModalDialogParams} from 'nativescript-angular/directives/dialogs'
import {Router} from '@angular/router';
import {StorageService} from '~/app/shared/storage.service';
import {Game1} from '~/app/games/games.model';

@Component({
  selector: 'ns-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
    game: Game1;
    isFav: boolean;

  constructor(private params: ModalDialogParams,
              private router: Router,
              private favService: StorageService,) { }

  ngOnInit() {
      this.game = this.params.context.game;
      this.isFav = this.favService.isFavourite(this.game);
      console.log(this.game, this.params);
  }

  playGame() {
      this.closeModal();
      this.favService.setRecentlyPlayed(this.game);
      setTimeout(()=>{
      this.router.navigate(['games/play'], { queryParams: { url: this.game.link } });
      },0);
  }

  addToFav() {
      this.closeModal();
      setTimeout(()=>{
      this.favService.updateFavourites(this.game);
      },0);
  }

  closeModal() {
      this.params.closeCallback();
  }

}
