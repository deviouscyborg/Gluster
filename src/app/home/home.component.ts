import { Component, OnInit } from '@angular/core';
import { Page } from "tns-core-modules/ui/page";
import {Router} from '@angular/router';

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private page: Page, private router: Router) { }

  ngOnInit() {
      this.page.actionBarHidden = true;
  }

    openApp(app: string) {
        var openApp = require("nativescript-open-app").openApp;
        switch (app) {
            case 'facebook':
                var installed = openApp("com.facebook.katana");
                console.log("Is it installed? " + installed);
                break;
            case 'whatsapp':
                var installed = openApp("com.whatsapp");
                console.log("Is it installed? " + installed);
                break;
            case 'instagram':
                var installed = openApp("com.instagram.android");
                console.log("Is it installed? " + installed);
                break;
            case 'snapchat':
                var installed = openApp("com.snapchat.android");
                console.log("Is it installed? " + installed);
                break;
        }
    }
}
