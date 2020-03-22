import {Component, OnInit} from "@angular/core";
import * as firebase from 'nativescript-plugin-firebase';
import { initializeOnAngular } from 'nativescript-image-cache';
import * as Admob from "nativescript-admob";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit{
    private androidBannerId: string = "ca-app-pub-4500169197993541/8614481600";
    private androidInterstitialId: string = "ca-app-pub-4500169197993541/7109828246";
    private androidNativeId: string = "ca-app-pub-4500169197993541/2766617926";
    // private iosBannerId: string = "ca-app-pub-RRRR/TTTT";
    // private iosInterstitialId: string = "ca-app-pub-GGGG/HHHH";

    constructor () {
        initializeOnAngular();
    }

    public createBanner() {
        Admob.createBanner({
            testing: true,
            size: Admob.AD_SIZE.SMART_BANNER,
            // iosBannerId: this.iosBannerId,
            androidBannerId: this.androidBannerId,
            // iosTestDeviceIds: ["yourTestDeviceUDIDs"],
            margins: {
                bottom: 0
            }
        }).then(function() {
            console.log("admob createBanner done");
        }, function(error) {
            console.log("admob createBanner error: " + error);
        });
    }

    public hideBanner() {
        Admob.hideBanner().then(function() {
            console.log("admob hideBanner done");
        }, function(error) {
            console.log("admob hideBanner error: " + error);
        });
    }

    public createInterstitial() {
        Admob.createInterstitial({
            testing: true,
            // iosInterstitialId: this.iosInterstitialId,
            androidInterstitialId: this.androidInterstitialId,
            // iosTestDeviceIds: ["yourTestDeviceUDIDs"]
        }).then(function() {
            console.log("admob createInterstitial done");
        }, function(error) {
            console.log("admob createInterstitial error: " + error);
        });
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
},
})
.then(() => {
    console.log('[Firebase] Initialized');
})
    .catch(error => {
        console.log('[Firebase] Initialize', { error });
    });

    firebase.subscribeToTopic("all").then(() => console.log("Subscribed to topic"));

    }
}
