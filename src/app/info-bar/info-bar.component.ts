import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.sass']
})
export class InfoBarComponent implements OnInit {
  @Input() winner: string;
  @Input() score: {x: number, o: number, draw: number};
  @Input() xIsNext: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
