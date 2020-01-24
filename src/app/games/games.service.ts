import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GamesService {
    private serverUrl = "https://api.famobi.com/feed?a=A-6VYWU&n=100";
    constructor(private http: HttpClient) {}

    getGames() {
        return this.http.get(this.serverUrl);
    }
}
