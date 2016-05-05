import {IonicApp, Page, NavController, NavParams} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {MediaUploadPage} from '../mediaupload/mediaupload';
import {CommentPage} from '../comment/comment';


@Page({
    templateUrl: 'build/pages/poi-details/poi-details.html',
    pipes: [TranslatePipe]
})

export class POIDetailsPage {
    poi: any;
    nav: NavController;
    translate: TranslateService;

    constructor(app: IonicApp, nav: NavController, navParams: NavParams, translate: TranslateService) {
        this.nav = nav;
        this.translate = translate;

        // If we navigated to this page, we will have an item available as a nav param
        this.poi = navParams.get('item');

        //create temporary properties for view model
        if (this.poi.MediaItems != null && this.poi.MediaItems.length > 0) {
            this.poi._hasPhotos = true;
        } else {
            this.poi._hasPhotos = false;
        }
    }

    addComment() {
        this.nav.push(CommentPage, {
            id: this.poi.ID,
            poi: this.poi
        });
    }

    addMedia() {
        this.nav.push(MediaUploadPage, {
            id: this.poi.ID
        });
    }

    toggleFavourite() {
        //TODO: add/remove favourite from journeys/favourites
    }

    edit() {
        //TODO: edit
    }
}
