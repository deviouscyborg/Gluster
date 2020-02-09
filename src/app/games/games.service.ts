import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GamesService {
    private famobiUrl = "https://api.famobi.com/feed?a=A-6VYWU&n=100";
    private softgamesUrl = "https://publishers.softgames.com/categories/games.json?p=pub-16746-16813&categories=&languages=&title=";
    softGamesNew = "https://publishers.softgames.com/categories/new_games.json?p=pub-16746-16813&categories=&languages=&title=";
    constructor(private http: HttpClient) {}

    getGames() {
        return this.http.get(this.softgamesUrl);
    }

    getNewGames() {
        return this.http.get(this.softGamesNew);
    }
}
