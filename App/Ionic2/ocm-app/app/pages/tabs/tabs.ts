import {Component} from '@angular/core';
import {SearchPage} from '../search/search';
import {JourneysPage} from '../journeys/journeys';
import {SettingsPage} from '../settings/settings';
import {ProfilePage} from '../profile/profile';
import {AppManager} from '../../core/ocm/services/AppManager';

@Component({
    templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
    tabSearch: any;
    tabJourneys: any;
    tabSettings: any;
    tabProfile: any;


    constructor(private appManager: AppManager) {
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tabSearch = SearchPage;
        this.tabJourneys = JourneysPage;
        this.tabSettings = SettingsPage;
        this.tabProfile = ProfilePage;

    }
    get settingsTabBadge(): string {
        if (this.appManager != null && this.appManager.searchSettings != null) {
            if (this.appManager.searchSettings.HasActiveFilters) {
                return "!";
            } else {
                return "";
            }
        }
        else {
            return "";
        }
    }

}
