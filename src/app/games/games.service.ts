import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from '~/../node_modules/rxjs/operators';
import {throwError} from '~/../node_modules/rxjs';
import * as firebase from 'nativescript-plugin-firebase';

@Injectable({ providedIn: 'root' })
export class GamesService {
    constructor(private http: HttpClient) {}


    getTrendingGames() {
        return firebase.getValue('/trendingGames')
            .then(result => {
                // console.log(result);
                return result.value;
            })
            .catch(error => console.log("Error: " + error));
    }

    getAllGames() {
        return firebase.getValue('/allGames')
            .then(result => {
                // console.log(result);
                return result.value;
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
