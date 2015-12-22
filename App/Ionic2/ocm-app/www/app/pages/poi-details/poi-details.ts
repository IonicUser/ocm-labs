import {IonicApp, Page, NavController, NavParams} from 'ionic-framework/ionic';



@Page({
  templateUrl: 'app/pages/poi-details/poi-details.html',
})
export class POIDetailsPage {
  constructor(app: IonicApp, nav: NavController, navParams: NavParams) {
    this.nav = nav;
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }
}
