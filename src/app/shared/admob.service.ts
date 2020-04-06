import { Injectable } from '@angular/core';
import * as Admob from "nativescript-admob";

@Injectable({
  providedIn: 'root'
})
export class AdmobService {
    private androidBannerId: string = "ca-app-pub-4500169197993541/8614481600";
    private androidInterstitialId: string = "ca-app-pub-4500169197993541/7109828246";
    private androidNativeId: string = "ca-app-pub-4500169197993541/2766617926";
    private androidRewardedVideoId: string = "ca-app-pub-4500169197993541/4828586746";
    // private iosBannerId: string = "ca-app-pub-RRRR/TTTT";
    // private iosInterstitialId: string = "ca-app-pub-GGGG/HHHH";

    public createBanner() {
        Admob.createBanner({
            testing: true,
            size: Admob.AD_SIZE.BANNER,
            // iosBannerId: this.iosBannerId,
            androidBannerId: this.androidBannerId,
            // iosTestDeviceIds: ["yourTestDeviceUDIDs"],
            margins: {
                bottom: 56
            }
        }).then(() => {
            console.log("admob createBanner done");
        }, (error) => {
            console.log("admob createBanner error: " + error);
        });
    }

    public hideBanner() {
        Admob.hideBanner().then(() => {
            console.log("admob hideBanner done");
        }, (error) => {
            console.log("admob hideBanner error: " + error);
        });
    }

    public createInterstitial() {
        Admob.createInterstitial({
            testing: true,
            // iosInterstitialId: this.iosInterstitialId,
            androidInterstitialId: this.androidInterstitialId,
            // iosTestDeviceIds: ["yourTestDeviceUDIDs"]
        }).then(() => {
            console.log("admob createInterstitial done");
        }, (error) => {
            console.log("admob createInterstitial error: " + error);
        });
    }

    public preLoadInterstitial() {
        Admob.preloadInterstitial({
            testing: true,
            // iosInterstitialId: this.iosInterstitialId,
            androidInterstitialId: this.androidInterstitialId,
            // iosTestDeviceIds: ["yourTestDeviceUDIDs"]
            onAdClosed: function () { console.log("interstitial closed") }
        }).then(() => {
            console.log("interstitial preloaded - you can now call 'showInterstitial' whenever you're ready to do so");
            setTimeout(() => {
                this.showInterstitial();
            },180000);
        }, (error) => {
            console.log("admob preloadInterstitial error: " + error);
        });
    }

    public showInterstitial() {
        Admob.showInterstitial().then(() => {
            console.log("interstitial showing");
        }, (error) => {
            console.log("admob showInterstitial error: " + error);
        });
    }

    public preloadRewardedVideo() {
        Admob.preloadRewardedVideoAd({
            testing: true,
            // iosAdPlacementId: "ca-app-pub-XXXXXX/YYYYY2", // add your own
            androidAdPlacementId: this.androidRewardedVideoId, // add your own
            // keywords: ["keyword1", "keyword2"], // add keywords for ad targeting
        }).then(
            () => {
                setTimeout(() => {
                    this.showRewardedVideo();
                },480000);
                console.log("RewardedVideoAd preloaded - you can now call 'showRewardedVideoAd' whenever you're ready to do so");
            },
            (error) => {
                console.log("admob preloadRewardedVideoAd error: " + error);
            }
        )
    }

    showRewardedVideo() {
        Admob.showRewardedVideoAd({
            onRewarded: (reward) => {
                console.log("onRewarded");
            },
            onRewardedVideoAdLeftApplication: () => console.log("onRewardedVideoAdLeftApplication"),
            onRewardedVideoAdClosed: () => console.log("onRewardedVideoAdClosed"),
            onRewardedVideoAdOpened: () => console.log("onRewardedVideoAdOpened"),
            onRewardedVideoStarted: () => console.log("onRewardedVideoStarted"),
            onRewardedVideoCompleted: () => console.log("onRewardedVideoCompleted"),
        }).then(
            () => {
                console.log("RewardedVideoAd showing");
            },
            (error) => {
                console.log("admob showRewardedVideoAd error: " + error);
            }
        )
    }

  constructor() { }
}
