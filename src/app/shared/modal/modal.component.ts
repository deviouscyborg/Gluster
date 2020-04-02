import { Component, OnInit } from '@angular/core';
import {ModalDialogParams} from 'nativescript-angular/directives/dialogs'
import {Router} from '@angular/router';
import {StorageService} from '~/app/shared/storage.service';
import {game} from '~/app/games/games.model';
import {CommunicationService} from '~/app/shared/communication.service';

@Component({
  selector: 'ns-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
    game: game;
    isFav: boolean;

  constructor(private params: ModalDialogParams,
              private router: Router,
              private favService: StorageService,
              private comm: CommunicationService) { }

  ngOnInit() {
      this.comm.modalDisplay.subscribe(res => {
          if (res == false) {
              this.closeModal();
          }
      });
      this.game = this.params.context.game;
      this.isFav = this.favService.isFavourite(this.game);
      console.log(this.game, this.params);
  }

  playGame() {
      // this.closeModal();
      this.comm.modalDisplay.next(false);
      this.comm.isPlaying.next(true);
      this.favService.setRecentlyPlayed(this.game);
      setTimeout(()=>{
      this.router.navigate(['games/play'], { queryParams: { url: this.game.link } });
      },0);
  }

  addToFav() {
      // this.closeModal();
      this.comm.modalDisplay.next(false);
      setTimeout(()=>{
      this.favService.updateFavourites(this.game);
      },0);
  }

  closeModal() {
      this.params.closeCallback();
  }

}
