import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Plugins } from '@capacitor/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

const { Browser } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  newVersionAvailable = false;

  private readonly cookieName = 'cookie-message-read';
  private readonly cookieValue = 'readed';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private swUpdate: SwUpdate,
    private translate: TranslateService,
    private toastController: ToastController,
    private cookieService: CookieService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async openLink(link: string) {
    Browser.addListener('browserFinished', (info: any) => {
      window.location.reload();
      Browser.close();
    });

    await Browser.open({ url: link });
  }

  ngOnInit() {
    this.translate.setDefaultLang('de');
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        this.newVersionAvailable = true;
      });
    }
    setTimeout(() => this.maybePresentCookieBanner(), 5000);
  }

  loadNewVersion() {
    window.location.reload();
  }

  async maybePresentCookieBanner() {
    const cookieRead = this.cookieService.get(this.cookieName);
    if (cookieRead !== this.cookieValue) {
      const toast = await this.toastController.create({
        header: 'Wir verwenden Cookies',
        message:
          'Um unsere Webseite für Sie optimal zu gestalten und fortlaufend verbessern zu können, verwenden wir Cookies. Durch die weitere Nutzung der Webseite stimmen Sie der Verwendung von Cookies zu.',
        position: 'bottom',
        color: 'secondary',
        buttons: [
          {
            side: 'end',
            icon: 'checkmark',
            text: 'OK',
            handler: () => {
              const now = new Date();
              const newDate = new Date(now.setFullYear(now.getFullYear() + 10));
              this.cookieService.set(this.cookieName, this.cookieValue, newDate);
            },
          },
        ],
      });
      toast.present();
    }
  }
}
