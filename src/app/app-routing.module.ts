import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import {HomeComponent} from '~/app/home/home.component';
import {NewsComponent} from '~/app/news/news.component';
import {NewsDetailComponent} from '~/app/news/news-detail/news-detail.component';
import {GamesComponent} from '~/app/games/games.component';
import {GamePlayComponent} from '~/app/games/game-play/game-play.component';

const routes: Routes = [
    { path: '', redirectTo: '/home/(newsoutlet:news//gamesoutlet:games)', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, children: [
            { path: 'news', component: NewsComponent, outlet: 'newsoutlet'},
            { path: 'news/detail', component: NewsDetailComponent, outlet: 'newsoutlet'},
            { path: 'games', component: GamesComponent, outlet: 'gamesoutlet'},
            { path: 'games/play', component: GamePlayComponent, outlet: 'gamesoutlet'}
        ]}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
