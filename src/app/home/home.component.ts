import { Component, OnInit } from '@angular/core';
import {isAndroid, Page} from "tns-core-modules/ui/page";
import {Router} from '@angular/router';
import * as application from 'tns-core-modules/application';
import {AndroidApplication} from 'tns-core-modules/application';
import {AndroidActivityBackPressedEventData} from 'tns-core-modules/application';

@Component({
    selector: 'ns-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private page: Page, private router: Router) {}

    ngOnInit() {
        this.page.actionBarHidden = true;
        if(isAndroid) {
            this.backButtonPressed();
        }
    }

    backButtonPressed() {
        application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            if (true) {
                data.cancel = true; // prevents default back button behavior
            }
        });
    }
}
