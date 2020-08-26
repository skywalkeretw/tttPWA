import {Component, OnDestroy, OnInit} from '@angular/core';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit, OnDestroy {
  squares: any[];
  xIsNext: boolean;
  winner: string;
  moveCounter: number
  score: {x: number, o: number}

  constructor() { }

  ngOnInit(): void {
    const savedScore = JSON.parse(localStorage.getItem('tttScore'));
    // const currentGame = JSON.parse(localStorage.getItem('tttCurrentGame'));
    if (savedScore !== null){
      this.score = savedScore
    } else {
      this.score = {x: 0, o:0}
    }
    this.newGame()
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
    this.moveCounter = 0;

  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }
  get moves() {
    return this.winner ? 100 : this.moveCounter/9*100
  }


  makeMove(idx: number) {
    if (this.winner == null) {
      if (!this.squares[idx]) {
        this.squares.splice(idx, 1, this.player);
        this.xIsNext = !this.xIsNext;
        this.moveCounter++
      }
      this.winner = this.calculateWinner();
      if (this.winner){
        if (this.winner == 'X') {
          this.score.x++
        } else if (this.winner == 'O') {
          this.score.o++
        }
        localStorage.setItem('tttScore', JSON.stringify(this.score))
        /*
        if (confirm("Player "+ this.winner + " won the game!\n Play another round?")) {
          this.newGame()
        }
        */
      }
    }
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
        return this.squares[a];
      }
    }
    return null;
  }

  ngOnDestroy(): void {
    localStorage.setItem('tttScore', JSON.stringify(this.score))
    // localStorage.setItem('tttCurrentGame', JSON.stringify(this.squares))
  }
}
