import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  @Input() reset: boolean

  resetScore(value: boolean) {
    if (value) {
      this.reset = true;
      setTimeout(() => {
        this.reset = null;
      }, 5);
    }
  }
}
