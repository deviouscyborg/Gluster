import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Page} from '@nativescript/core';

@Component({
  selector: 'ns-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
    article_url: string;
    isLoading=true;

  constructor(private activatedRoute: ActivatedRoute,
              private page: Page) { }

  ngOnInit() {
      this.page.actionBarHidden = true;
      this.activatedRoute.queryParams.subscribe( params => {
          this.article_url = params.url;
          });
  }

    onLoadFinished() {
      this.isLoading=false;
    }

}
