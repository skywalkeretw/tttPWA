import { Component, OnInit } from '@angular/core';
import {MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top'
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  resetLocalScore() {
    localStorage.removeItem('tttLocalScore');
    this._snackBar.open(
      'Score has been reset!',
      '',
      {
        duration: 1000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,

    });
  }
}
