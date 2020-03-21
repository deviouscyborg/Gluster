import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from '~/../node_modules/rxjs/operators';
import {throwError} from '~/../node_modules/rxjs';
import * as firebase from 'nativescript-plugin-firebase';

@Injectable({ providedIn: 'root' })
export class GamesService {
    private famobiUrl = "https://api.famobi.com/feed?a=A-6VYWU&n=100";
    private softgamesUrl = "https://publishers.softgames.com/categories/games.json?p=pub-16746-16813";
    private wanted5Url = "https://wanted5games.com/games/html5/";
    softGamesNew = "https://publishers.softgames.com/categories/new_games.json?p=pub-16746-16813&categories=&languages=&title=";
    constructor(private http: HttpClient) {}


    getTrendingGames() {
        return firebase.getValue('/trendingGames')
            .then(result => {
                console.log(result);
                return result;
            })
            .catch(error => console.log("Error: " + error));
    }

    getAllGames() {
        return firebase.getValue('/allGames')
            .then(result => {
                console.log(result);
                return result;
            })
            .catch(error => console.log("Error: " + error));
    }

    getDisplayCount() {
        return firebase.getValue('/displayCount')
            .then(result => {
                console.log(result);
                return result;
            })
            .catch(error => console.log("Error: " + error));
    }
}
