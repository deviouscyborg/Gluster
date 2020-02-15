import {Component, OnDestroy, OnInit} from '@angular/core';
import {isAndroid, Page} from "tns-core-modules/ui/page";
import {Router} from '@angular/router';
import * as application from 'tns-core-modules/application';
import {AndroidApplication} from 'tns-core-modules/application';
import {AndroidActivityBackPressedEventData} from 'tns-core-modules/application';
import * as Toast from 'nativescript-toast';

@Component({
    selector: 'ns-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    tries: number = 0;

    constructor(private page: Page, private router: Router) {}

    ngOnInit() {
        this.page.actionBarHidden = true;
        if(isAndroid) {
            this.backButtonPressed();
        }
    }

    backButtonPressed() {
        application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            if(this.router.isActive('/home', false)) {
                data.cancel = (this.tries++ <= 0);
                if (data.cancel) Toast.makeText("Press again to exit", "long").show();
                setTimeout(() => {
                    this.tries = 0;
                }, 2000);
            }
        });
    }
}
