import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {DataItem} from '~/app/news/news.component';

@Injectable({ providedIn: 'root' })
export class NewsService {
    private serverUrl = "https://newsapi.org/v2/top-headlines?sources=techcrunch";
    constructor(private http: HttpClient) {}

    private createRequestHeader() {
        let headers = new HttpHeaders({
            "x-api-key": "7bc4bb6633794e92b54dca3836072f5d",
        });

        return headers;
    }

    getNews() {
        let headers = this.createRequestHeader();
        return this.http.get(this.serverUrl, { headers: headers });


        // return this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=7bc4bb6633794e92b54dca3836072f5d')
        //     .pipe(
        //         map((response) => {
        //             console.log('service response', response);
        //             return response.articles;
        //         },
        //         catchError(error => {
        //             console.log('====================================');
        //             console.log('NewsService -> getNews -> error', error);
        //             console.log('====================================');
        //             if (error.status === 400) {
        //                 return throwError(JSON.parse(error.error.errors[0].reason));
        //             } else {
        //                 return throwError({ code: error.status, detail: error.statusText });
        //             }
        //         }))
        //     );
    }
}
