import {Page, NavController, Modal, Alert} from 'ionic-angular';
import {AppManager} from '../../core/ocm/services/AppManager';
import {SignInPage} from '../signin/signin';

@Page({
    templateUrl: 'build/pages/profile/profile.html'
})
export class ProfilePage {

    userProfile: any;
    constructor(public appManager: AppManager, public nav: NavController) {

    }

    onPageWillEnter() {

        this.userProfile = this.appManager.getUserProfile();

        if (this.userProfile == null || !this.appManager.isUserAuthenticated()) {
            //navigate to sign in page
            let signInModal = Modal.create(SignInPage, { Profile: this.userProfile });
            this.nav.present(signInModal);
        }
    }

    signOut() {
        this.appManager.signOutCurrentUser();
        this.userProfile = null;

        let alert = Alert.create({
            title: 'Signed Out',
            subTitle: 'You are no signed out',
            buttons: ['Dismiss']
        });
        this.nav.present(alert);
    }

}
