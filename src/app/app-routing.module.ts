import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import {HomeComponent} from '~/app/home/home.component';
import {GamesComponent} from '~/app/games/games.component';
import {GamePlayComponent} from '~/app/games/game-play/game-play.component';

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
        ]}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
