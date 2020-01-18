import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {DataItem} from '~/app/news/news.component';

@Injectable({ providedIn: 'root' })
export class NewsService {
    constructor(private http: HttpClient) {}
    getNews(): Observable<DataItem[]> {
        return this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=7bc4bb6633794e92b54dca3836072f5d')
            .pipe(
                map((response: {articles: DataItem[]}) => {
                    console.log('service response', response);
                    return response.articles;
                })
            );
    }

}
