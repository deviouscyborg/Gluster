import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Page} from '@nativescript/core';
import { WebView } from "tns-core-modules/ui/web-view";

@Component({
  selector: 'ns-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss']
})
export class GamePlayComponent implements OnInit {
    game_url: string;
    isLoading=false;
    @ViewChild("webview", {static: false}) webViewRef;

    constructor(private activatedRoute: ActivatedRoute,
              private page: Page) { }

  ngOnInit() {
      this.page.actionBarHidden = true;
      this.activatedRoute.queryParams.subscribe( params => {
          this.game_url = params.url;
      });
  }
    onWebViewLoaded(args) {
        let webView: WebView = this.webViewRef.nativeElement;
        webView.on(WebView.loadStartedEvent, function() {
            // webView.android.setWebContentsDebuggingEnabled(true);
            webView.android.getSettings().setJavaScriptEnabled(true);
            webView.android.getSettings().setAllowUniversalAccessFromFileURLs(true);
            webView.android.getSettings().setDomStorageEnabled(true);
            webView.android.setWebChromeClient(new android.webkit.WebChromeClient());
        });
    }

    onLoadFinished() {
      this.isLoading = false;
  }

  onLoadStarted() {
      this.isLoading = true;
  }

}
