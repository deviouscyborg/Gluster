import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GamesService {
    private serverUrl = "https://games.gamepix.com/games?sid=1&order=q ";
    constructor(private http: HttpClient) {}

    getGames() {
        return this.http.get(this.serverUrl);
    }
}
