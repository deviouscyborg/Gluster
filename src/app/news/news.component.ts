import { Component, OnInit } from '@angular/core';
import {SearchBar} from 'tns-core-modules/ui/search-bar';
import {isAndroid, isIOS} from 'tns-core-modules/platform';
import {NewsService} from '~/app/news/news.service';

declare const IQKeyboardManager: any;

export interface DataItem {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
}

interface Source {
    id: string;
    name: string;
}


@Component({
  selector: 'ns-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {


    allNews: DataItem[];
    isLoading: boolean = true;

    searching = false;

    news: DataItem[];

    actionAndroid;

    constructor(private newsService: NewsService) {
        this.actionAndroid = isAndroid;

        // this.news = this.allNews.filter((e) => {
        //     return e.urlToImage && e.title && e.description && e.source.name;
        // });

        if (isIOS) {
            var keyboard = IQKeyboardManager.sharedManager();
            keyboard.shouldResignOnTouchOutside = true;
        }
    }

    public onSubmit(args) {
        let searchBar = <SearchBar>args.object;
        this.onSearch(searchBar.text ? searchBar.text.toLowerCase() : "");
        searchBar.dismissSoftInput();
    }

    onSearch(searchValue) {
        if (searchValue !== "") {
            this.news = this.allNews.filter((e) => {
                return (e.urlToImage && e.title && e.description && e.source.name) &&
                    (e.description.toLowerCase().includes(searchValue) || e.title.toLowerCase().includes(searchValue));
            });
        }
    }

    public onClear(args) {
        let searchBar = <SearchBar>args.object;
        searchBar.text = "";
        searchBar.hint = "Search for a news and press enter";
        this.allNews.forEach(item => {
            this.news.push(item);
        });
        searchBar.dismissSoftInput();
        this.searching = false;
    }

    public onTextChange(args) {
        let searchBar = <SearchBar>args.object;
        this.onSearch(searchBar.text ? searchBar.text.toLowerCase() : "");
    }

    ngOnInit(): void {
        this.newsService.getNews()
            .subscribe(newsArticles => {
                this.isLoading=false;
                this.allNews = newsArticles;
                this.news = newsArticles;
                console.log(newsArticles);
            }, error => {
                this.isLoading=false;
                this.allNews = [];
                console.log(error);
            })


    }
}
