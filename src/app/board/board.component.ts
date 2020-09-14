import {Component, OnDestroy, OnInit, } from '@angular/core';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit, OnDestroy {

  squares: any[];
  xIsNext: boolean;
  winner: string;
  winnerRow: number[];
  moveCounter: number;
  score: {x: number, o: number, draw: number};

  constructor() { }

  /**
   * Angular Life Cycle
   */

  /**
   * OnInit
   * when Component is Initialised
   */
  ngOnInit(): void {
    const savedScore = JSON.parse(localStorage.getItem('tttScore'));
    if (savedScore !== null){
      this.score = savedScore
    } else {
      this.score = {x: 0, o:0, draw:0}
    }
    this.newGame()
  }

  /**
   * OnDestroy
   * When Component is destroyed
   */
  ngOnDestroy(): void {
    localStorage.setItem('tttScore', JSON.stringify(this.score));
  }

  /**
   * resets all values for a new game player 1 us choosen at random
   */
  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.winnerRow = [];
    this.xIsNext = Math.random() >= 0.5;
    this.moveCounter = 0;
  }

  /**
   *
   * @param idx
   */
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
        this.winner == 'X' ? this.score.x++ :  this.score.o++;
      }
      if (this.winner === null && this.moveCounter === 8) {
        this.score.draw++
      }
      localStorage.setItem('tttScore', JSON.stringify(this.score));
    }
  }

  showWinnerRow(i: number) {
    return this.winnerRow.includes(i) && (this.winner === 'X' || this.winner === 'O');
  }
  /**
   * chckes fields to see if one of the players has won the game
   */
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
    return null;
  }

}
