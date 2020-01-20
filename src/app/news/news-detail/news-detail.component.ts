import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ns-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
    article_url: string;
    isLoading=true;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
      this.activatedRoute.queryParams.subscribe( params => {
          this.article_url = params.url;
          });
  }

    onLoadFinished() {
      this.isLoading=false;
    }

}
