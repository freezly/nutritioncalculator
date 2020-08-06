import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-powered-by',
  templateUrl: './powered-by.component.html',
  styleUrls: ['./powered-by.component.scss'],
})
export class PoweredByComponent implements OnInit {
  showPoweredBy = true;
  cookieName = 'ndc-showPoweredBy';
  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    if (this.cookieService.check(this.cookieName)) {
      this.showPoweredBy = this.cookieService.get(this.cookieName) === 'true';
    } else {
      this.showPoweredBy = true;
    }
  }

  private saveShowPoweredBy() {
    const now = new Date();
    const newDate = new Date(now.setMonth(now.getMonth() + 1));
    this.cookieService.set(this.cookieName, `${this.showPoweredBy}`, newDate);
  }

  toggleShow() {
    this.showPoweredBy = !this.showPoweredBy;
    this.saveShowPoweredBy();
  }
}
