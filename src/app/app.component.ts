import {Component, OnInit} from "@angular/core";
import {initializeOnAngular} from 'nativescript-image-cache';
import * as firebase from 'nativescript-plugin-firebase';

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit{
    constructor () {
        initializeOnAngular();
    }
    ngOnInit() {
    firebase.init({
                      showNotifications: true,
                      showNotificationsWhenInForeground: true,

                      onPushTokenReceivedCallback: (token) => {
    console.log('[Firebase] onPushTokenReceivedCallback:', { token });
},

onMessageReceivedCallback: (message: firebase.Message) => {
    console.log('[Firebase] onMessageReceivedCallback:', { message });
}
})
.then(() => {
    console.log('[Firebase] Initialized');
})
    .catch(error => {
        console.log('[Firebase] Initialize', { error });
    });

}
}
