import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewContainerRef} from '@angular/core';
import {GamesService} from '~/app/games/games.service';
import {Router} from '@angular/router';
import {Page} from '@nativescript/core';
import {StorageService} from '~/app/shared/storage.service';
import {game} from '~/app/games/games.model';
import {ModalComponent} from '~/app/shared/modal/modal.component';
import {ModalDialogService} from 'nativescript-angular/modal-dialog'
import {CommunicationService} from '~/app/shared/communication.service';
import {AdmobService} from '~/app/shared/admob.service';


@Component({
  selector: 'ns-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
    isLoading = true;

  constructor(private gamesService: GamesService,
              private router: Router,
              private page: Page,
              private favService: StorageService,
              private modal: ModalDialogService,
              private vcRef: ViewContainerRef,
              private comm: CommunicationService,
              private admob: AdmobService) {}
  games: game[] = [];
  @Output() emitGames: EventEmitter<game[]> = new EventEmitter<game[]>();
  trendingGames: game[];

  ngOnInit() {
      // this.page.actionBarHidden = true;

      this.gamesService.getAllGames()
          .then(res => {
                  this.games = res;
                  this.emitGames.emit(res);
                  this.isLoading = false;
                  setTimeout(() => {
                  this.showAds();
                  this.admob.preLoadInterstitial();
                  this.admob.preloadRewardedVideo();
                  }, 0);
              }
          )
          .catch(error => {
              this.isLoading = false;
              console.log(error);
          });
      // this.gamesService.getGames()
      //     .subscribe( (response: Game1[]) => {
      //         this.isLoading = false;
      //         this.games = response;
      //         console.log('----', this.games);
      //         }, error => {
      //         this.isLoading = false;
      //         console.log(error);
      //     });

      this.gamesService.getTrendingGames()
          .then(res => {
                  this.trendingGames = res;
                  // this.isLoading = false;
              }
          )
          .catch(error => {
              // this.isLoading = false;
              console.log(error);
          });
  }

    playGame(item: game) {
        this.favService.setRecentlyPlayed(item);
        this.router.navigate(['games/play'], { queryParams: { url: item.link } });
    }

    showAds() {
      this.admob.createBanner();
    }

    showModal(item: game) {
        this.comm.modalDisplay.next(true);
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
