import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  //rootPage: any = 'HomePage';
  rootPage: any = 'LoginPage';
  appMenuItems: Array<MenuItem>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.appMenuItems = [
      { title: 'Home', component: 'HomePage', icon: 'home' },
      { title: 'User', component: 'UserPage', icon: 'people' },
      { title: 'Login', component: 'LoginPage', icon: 'log-in' },
      { title: 'Register', component: 'RegisterPage', icon: 'key' },
      { title: 'Log', component: 'LogPage', icon: 'information' }
    ];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

}
