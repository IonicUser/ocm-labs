
import {OnInit} from 'angular2/core';
import {Http} from 'angular2/http';
import {App, Platform, Config, Events} from 'ionic-framework/ionic';

import {POIManager} from './core/ocm/services/POIManager'
import {APIClient} from './core/ocm/services/APIClient';
import {TabsPage} from './pages/tabs/tabs';


declare var plugin: any;

@App({
    template: '<ion-nav id="nav" [root]="root" #content></ion-nav>',
    providers: [POIManager, APIClient, Events],
    // Check out the config API docs for more info
    // http://ionicframework.com/docs/v2/api/config/Config/
    config: {}
})

export class MyApp implements OnInit {


    events: Events;
    root: any;

    constructor(platform: Platform, events: Events) {
        this.events = events;
        this.root = TabsPage;
        //trans.setLanguage("zh");
        platform.ready().then(() => {
            // Do any necessary cordova or native calls here now that the platform is ready
            console.log("cordova/ionic platform ready");

            //check for native maps
            if ((<any>window).plugin) {
                //we can switch over to Native Maps API
            }
        });
    }

    ngOnInit() {
        //startup
        var appContext = this;
        //notify subscribers of window resizes (map etc)
        window.addEventListener("resize", function() {
            var winWidth: number;
            var winHeight: number;
            if (typeof (window.innerWidth) == 'number') {
                winWidth = window.innerWidth;
                winHeight = window.innerHeight;
            } else {
                if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                    winWidth = document.documentElement.clientWidth;
                    winHeight = document.documentElement.clientHeight;
                } else {
                    if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                        winWidth = document.body.clientWidth;
                        winHeight = document.body.clientHeight;
                    }
                }
            }
            console.log("window resized:" + winWidth + "x" + winHeight);
            appContext.events.publish('ocm:window:resized', { width: winWidth, height: winHeight });
        });
    }
}