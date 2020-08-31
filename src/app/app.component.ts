import {Component, Input} from '@angular/core';
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  @Input() reset: boolean

  constructor(private meta: Meta) {
    this.meta.addTags([
      {name: 'description', content: 'Tic-Tac-Toe Game created '},
      {name: 'keywords', content: 'PWA, Tic-Tac-Toe, game'},
      {name: 'author', content: 'Luke Roy'},
    ])
  }
  resetScore(value: boolean) {
    if (value) {
      this.reset = true;
      setTimeout(() => {
        this.reset = null;
      }, 5);
    }
  }
}
