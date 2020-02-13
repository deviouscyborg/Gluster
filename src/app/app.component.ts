import { Component } from "@angular/core";
import {initializeOnAngular} from 'nativescript-image-cache';

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent {
    constructor () {
        initializeOnAngular();
    }
}
