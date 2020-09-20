import {Component, OnDestroy, OnInit, } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit, OnDestroy {

  squares: any[];
  xIsNext: boolean;
  winner: string;
  private winnerRow: number[];
  moveCounter: number;
  score: {x: number, o: number, draw: number};

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const savedScore = JSON.parse(localStorage.getItem('tttLocalScore'));
    if (savedScore !== null){
      this.score = savedScore
    } else {
      this.score = {x: 0, o:0, draw:0}
    }
    this.newGame()
  }

  ngOnDestroy(): void {
    localStorage.setItem('tttLocalScore', JSON.stringify(this.score));
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.winnerRow = [];
    this.xIsNext = Math.random() >= 0.5;
    this.moveCounter = 0;
    const player = this.xIsNext ? 'X' : 'O';
    const message = 'New Game Started, Player ' + player + ' beginns.'
    this.snackBar(message)
  }

  makeMove(idx: number) {
    console.log(this.moveCounter)
    if (this.winner == null) {
      if (!this.squares[idx]) {
        this.squares.splice(idx, 1, this.xIsNext ? 'X' : 'O');
        this.xIsNext = !this.xIsNext;
        this.moveCounter++
      }
      this.winner = this.calculateWinner();
      if (this.winner){
        if (this.winner === 'd') {
          this.score.draw++
          this.snackBar('Its a Draw!', '', 5000);
        } else {
          this.winner == 'X' ? this.score.x++ :  this.score.o++;
          this.snackBar('Player ' + this.winner + ' Won the Game!', '', 5000);
        }
        localStorage.setItem('tttLocalScore', JSON.stringify(this.score));
      }
    }
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

  showWinnerRow(i: number) {
    return this.winnerRow.includes(i) && (this.winner === 'X' || this.winner === 'O');
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        this.winnerRow = lines[i];
        return this.squares[a];
      }
    }
    if (this.moveCounter === 9 ){
      return 'd'
    }
    return null;
  }

}
