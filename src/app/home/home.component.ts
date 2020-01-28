import { Component, OnInit } from '@angular/core';
import { Page } from "tns-core-modules/ui/page";

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private page: Page) { }

  ngOnInit() {
      this.page.actionBarHidden = true;
  }

}
