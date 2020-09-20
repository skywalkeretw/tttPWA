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

  uname: string = '';
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.uname = localStorage.getItem('tttUname');
  }

  resetLocalScore() {
    localStorage.removeItem('tttLocalScore');
    this.snackBar('Score has been reset!');
  }

  setUser() {
    localStorage.setItem('tttUname', this.uname);
    this.snackBar('Username has been set.');
  }

  snackBar(message: string,
           action: string = '',
           duration: number = 2000,
           horizontalPosition: MatSnackBarHorizontalPosition = 'center',
           verticalPosition: MatSnackBarVerticalPosition = 'top') {
    this._snackBar.open(
      message,
      action,
      {
        duration: duration,
        horizontalPosition: horizontalPosition,
        verticalPosition: verticalPosition,
      });
  }
}
