import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ns-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
    @Input() placeholder: string = 'Error';

  constructor() { }

  ngOnInit() {
  }

}
