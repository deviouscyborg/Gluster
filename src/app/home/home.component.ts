import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {isAndroid, Page} from "tns-core-modules/ui/page";
import {Router} from '@angular/router';
import * as application from 'tns-core-modules/application';
import {AndroidApplication} from 'tns-core-modules/application';
import {AndroidActivityBackPressedEventData} from 'tns-core-modules/application';
import * as Toast from 'nativescript-toast';
import {RadSideDrawer} from 'nativescript-ui-sidedrawer';
import { isIOS } from "tns-core-modules/platform";
import {CommunicationService} from '~/app/shared/communication.service';
import { BottomNavigation } from '@nativescript/core/ui';
import * as utils from "tns-core-modules/utils/utils";
import {game} from '~/app/games/games.model';
import {AdmobService} from '~/app/shared/admob.service';
import * as SocialShare from "nativescript-social-share";


@Component({
    selector: 'ns-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    games: game[];
    tries: number = 0;
    @ViewChild("rsd", {static:false}) rSideDrawer: ElementRef;
    sideDrawerOptions: string[] = [
        "Share",
        "Rate Us"
    ];
    tab: string = 'home';
    showCatGames;
    modalDisplay;
    @ViewChild('bottomNav', {static: false}) bottomNav: ElementRef;
    constructor(private page: Page,
                private router: Router,
                private comm: CommunicationService,
                private admob: AdmobService) {
    }


    ngOnInit() {
        // this.page.actionBarHidden = true;
        if(isAndroid) {
            this.backButtonPressed();
        }
        this.comm.catDisplayGames.subscribe(res => {
            this.showCatGames = res;
        });
        this.comm.modalDisplay.subscribe(res => {
            this.modalDisplay = res;
        });
    }
    isIOS(): boolean {
        return isIOS;
    }

    isAndroid(): boolean {
        return isAndroid;
    }
    drawerLoaded(args) {
        let drawer = <RadSideDrawer>args.object;

        if (isIOS) {
            // if your menu is drawn 'below' the hostview, do this:
            //drawer.ios.defaultSideDrawer.style.shadowMode = 1; // TKSideDrawerShadowMode.Hostview;
            drawer.ios.defaultSideDrawer.style.shadowMode = 2; // TKSideDrawerShadowMode.SideDrawer;
            // if you have shadowMode = 2, then you can add a little dim to the lower layer to add some depth. Keep it subtle though:
            drawer.ios.defaultSideDrawer.style.dimOpacity = 0.12;
            // then tweak the shadow to your liking:
            drawer.ios.defaultSideDrawer.style.shadowOpacity = 0.75; // 0-1, higher is darker
            drawer.ios.defaultSideDrawer.style.shadowRadius = 5; // higher is more spread
            // bonus feature: control the menu animation speed (in seconds)
            drawer.ios.defaultSideDrawer.transitionDuration = 0.25;
        }
    }

    onOpenDrawerTap(): void {
        this.rSideDrawer.nativeElement.toggleDrawerState();
    }

    backButtonPressed() {
        application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            if(this.tab === 'home') {
                if(this.modalDisplay == true) {
                    this.comm.modalDisplay.next(false);
                } else {
                    data.cancel = (this.tries++ <= 0);
                    if (data.cancel) Toast.makeText("Press again to exit", "long").show();
                    setTimeout(() => {
                        this.tries = 0;
                    }, 2000);
                }
            } else if (this.tab === 'search') {
                if(this.modalDisplay == true) {
                    this.comm.modalDisplay.next(false);
                } else {
                    this.bottomNav.nativeElement.selectedIndex = 0;
                }
            } else if (this.tab === 'cat') {
                if(this.modalDisplay == true) {
                    this.comm.modalDisplay.next(false);
                } else {
                    if (this.showCatGames == true) {
                        this.comm.catDisplayGames.next(false);
                    } else {
                        this.bottomNav.nativeElement.selectedIndex = 0;
                    }
                }
            } else if (this.tab === 'fav') {
                if(this.modalDisplay == true) {
                    this.comm.modalDisplay.next(false);
                } else {
                    this.bottomNav.nativeElement.selectedIndex = 0;
                }
            }
        });
    }

    sideDrawerOptionTap(event) {
        if(event === 'Share') {
            SocialShare.shareText("https://play.google.com/store/apps/details?id=com.dazzlecreations.gluster \n Download Gluster: All games in one game", "Share app");
        } else if(event === 'Rate Us') {
            utils.openUrl("market://details?id=com.dazzlecreations.gluster");
        }
        console.log(event);
    }

    tabTapped(tab: string) {
        this.tab = tab;
    }

    assignGames(gameList) {
        this.games = gameList;
    }
}
