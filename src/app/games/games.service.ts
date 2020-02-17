import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from '~/../node_modules/rxjs/operators';
import {throwError} from '~/../node_modules/rxjs';
import {Game1} from '~/app/games/games.model';

@Injectable({ providedIn: 'root' })
export class GamesService {
    private famobiUrl = "https://api.famobi.com/feed?a=A-6VYWU&n=100";
    private softgamesUrl = "https://publishers.softgames.com/categories/games.json?p=pub-16746-16813";
    softGamesNew = "https://publishers.softgames.com/categories/new_games.json?p=pub-16746-16813&categories=&languages=&title=";
    constructor(private http: HttpClient) {}

    getGames(categories?: string, languages?: string, title?: string) {
        if (!categories)
            categories='';
        if(!languages)
            languages='';
        if(!title)
            title='';

        return this.http.get(this.softgamesUrl+'&categories='+categories+'&languages='+languages+'&title='+title)
            .pipe(
                map((response: Game1[]) => {
                    return response;
                }),
                catchError( error => {
                    return throwError( 'Something went wrong!' );
                })
            )
    }

    getNewGames() {
        return this.http.get(this.softGamesNew).
        pipe(
            map((response: Game1[]) => {
                return response;
            }),
            catchError( error => {
                return throwError( 'Something went wrong!' );
            })
        )
    }
}
