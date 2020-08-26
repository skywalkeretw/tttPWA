import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  @Output() reset = new EventEmitter<boolean>()
  constructor() { }

  ngOnInit(): void {
  }

  resetScore() {
    this.reset.emit(true);
  }
}
