import { Component, OnInit } from '@angular/core';
import { Page } from "tns-core-modules/ui/page";
import {Router} from '@angular/router';

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private page: Page, private router: Router) { }

  ngOnInit() {
      this.page.actionBarHidden = true;
  }
    onSelectedIndexchanged(event) {
      console.log('EVENT: ',event.newIndex);
      switch (event.newIndex) {
          case 0:
          this.router.navigate(['/news']);
          break;
          case 1:
          this.router.navigate(['/games']);
          break;
      }
    }

}
