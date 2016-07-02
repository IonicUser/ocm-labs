import {Platform, Config, Events, NavController, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Http, ConnectionBackend} from '@angular/http';
import {Component, OnInit, provide, enableProdMode} from '@angular/core';

import {APIClient} from './core/ocm/services/APIClient';
import {AppManager} from './core/ocm/services/AppManager'
import {POIManager} from './core/ocm/services/POIManager'
import {SubmissionQueue} from './core/ocm/services/SubmissionQueue'
import {JourneyManager} from './core/ocm/services/JourneyManager';
import {ReferenceDataManager} from './core/ocm/services/ReferenceDataManager';
import {Base} from './core/ocm/Base';
import {TabsPage} from './pages/tabs/tabs';

import {Utils} from './core/ocm/Utils';
import {TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader, Parser} from 'ng2-translate';

declare var plugin: any;
declare var Connection: any;

enableProdMode();

@Component({
    template: '<ion-nav [root]="rootPage"></ion-nav>'
})


export class OpenChargeMapApp extends Base implements OnInit {

    rootPage: any = TabsPage;
    debouncedPublishResizeEvent: any;

    constructor(private platform: Platform, private events: Events, private http: Http, private translate: TranslateService, private appManager: AppManager) {
        super();


        //trans.setLanguage("zh");

        /*this.translate.translations('de', {
         'Location': 'lage',
         'ocm.test.key': 'wibble'
     });

     //this.translate.setLanguage('de');

     console.log("trans: " + this.translate.translate('Location')); // Shows 'Location'
     console.log("trans: " + this.translate.translate('ocm.test.key')); // Shows 'Location'
 
     ///
     */

        this.initTranslation();


        //actions to perform when platform is ready

        platform.ready().then(() => {
            // Do any necessary cordova or native calls here now that the platform is ready
            if (console) console.log("cordova/ionic platform ready");

            //check for native maps
            if ((<any>window).plugin) {
                //we can switch over to Native Maps API
            }
            if (platform.is("cordova") && StatusBar) {
                // StatusBar.overlaysWebView(false);
                // StatusBar.hide();//styleDefault();


            }
            /*
                        var networkState = (<any>navigator).connection.type;
            
                        var states = {};
                        states[Connection.UNKNOWN] = 'Unknown connection';
                        states[Connection.ETHERNET] = 'Ethernet connection';
                        states[Connection.WIFI] = 'WiFi connection';
                        states[Connection.CELL_2G] = 'Cell 2G connection';
                        states[Connection.CELL_3G] = 'Cell 3G connection';
                        states[Connection.CELL_4G] = 'Cell 4G connection';
                        states[Connection.CELL] = 'Cell generic connection';
                        states[Connection.NONE] = 'No network connection';
            
                        alert(states[networkState]);
            */
        });
    }




    initTranslation() {
        //init translation
        //this.translate.useStaticFilesLoader('lang', '.json');
        var defaultLang = "it";
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(it|en)/gi.test(userLang) ? userLang : defaultLang;
userLang="sk";
        // optional, default is "en"
        this.translate.setDefaultLang(defaultLang);
        // the lang to use, if the lang isn't available, it will use the current loader to get them

        this.log("[translate] "+ navigator.language+ ":: using language:" + userLang);
        this.translate.use(userLang).subscribe(() => {
            var test = this.translate.get("ocm.general.shortDescription");
            test.subscribe(data => {
                this.log("Translation test:" + data);
            });
        });




        /*
          var test2 = this.translate.get("ocm.general.shortDescription");
                    test2.subscribe(data => { 
                        this.log("Translation test2:" + data);    
                    });   
        */

        //translate.getTranslation(userLang);
    }


    ngOnInit() {
        //startup
        this.debouncedPublishResizeEvent = Utils.debounce(this.publishWindowResizeEvent, 300, false)
        //notify subscribers of window resizes (map etc)
        window.addEventListener("resize", () => { this.debouncedPublishResizeEvent(); });

        this.appManager.initAuthFromStorage();
    }

    publishWindowResizeEvent() {
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

        this.appManager.clientWidth = winWidth;
        this.appManager.clientHeight = winHeight;
        this.events.publish('ocm:window:resized', { width: winWidth, height: winHeight });
    }
}

ionicBootstrap(OpenChargeMapApp, [
    AppManager,
    POIManager,
    Events,
    provide(TranslateLoader, {
        useFactory: (http: Http) => new TranslateStaticLoader(http, 'lang', '.json'),
        deps: [Http]
    }),
    TranslateService,
    APIClient,
    SubmissionQueue,
    JourneyManager,
    ReferenceDataManager
], {
        //config
        prodMode: true,
        mode: "ios"
    });