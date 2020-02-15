import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import {HomeComponent} from '~/app/home/home.component';
import {GamesComponent} from '~/app/games/games.component';
import {GamePlayComponent} from '~/app/games/game-play/game-play.component';
import {SearchComponent} from '~/app/search/search.component';
import {CategoryComponent} from '~/app/category/category.component';
import {FavouritesComponent} from '~/app/favourites/favourites.component';

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "games",
        children: [
            {
                path: "",
                pathMatch: "full",
                component: GamesComponent
            },
            {
                path: "play",
                component: GamePlayComponent
            }
        ]},
    { path: "search", component: SearchComponent},
    { path: "categories", component: CategoryComponent},
    { path: "favourites", component: FavouritesComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
