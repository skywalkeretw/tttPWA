import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ServerApiService} from "../server-api.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";


interface game {
  gameId: string,
  name: string
  playerx: string //player 1 id
  playero: string //player 2 id
  gameData: {
    squares: any[];
    xIsNext: boolean;
    winner: string;
    moveCounter: number;
    score: {x: number, o: number, draw: number};
  }
}

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.sass']
})
export class OnlineComponent implements OnInit, OnDestroy {
  url = "ws://localhost:3000/ws"

  ws: WebSocket ;
  games: game[] = []
  gameIsActive: boolean;
  data: game

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.ws = new WebSocket(this.url)
    this.gameIsActive = false;
    this.data = {
      gameId: "",
        name: "",
      playerx: "", //player 1 id
      playero: "", //player 2 id
      gameData: {
        squares: [],
        xIsNext: false,
        winner: "",
        moveCounter: 0,
        score: {x: 0, o: 0, draw: 0},
      }
    }
    this.WebSocketEventlistener()
  }

  ngOnDestroy(): void {
  }


  WebSocketEventlistener() {
    this.ws.addEventListener("message", ({data}) => {
      const parsedData = JSON.parse(data);
      // console.log(parsedData)
      switch (parsedData.action) {
        case "activeGames":
          this.games = parsedData.data;
          break;
        case "gameCreated":
          this.data = parsedData.data;
          console.log(this.data);
      }
    })
  }
  getGames() {
    //call data from api
  }

  joinGame(id: string) {
    if (!this.gameIsActive) {
      this.ws.send(JSON.stringify(
        {
          action:"joinGame",
          data: {
            name: localStorage.getItem("tttUname"),
            gameId: id
          }
        }
      ))
      this.gameIsActive = true
    }
  }

  createGame() {
    if (!this.gameIsActive) {
      this.ws.send(JSON.stringify(
        {
          action:"createGame",
          data: {
            name: localStorage.getItem("tttUname")
          }
        }
      ));
      this.gameIsActive = true
    }
  }

/*
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
*/


  newGame() {

  }

  makeMove(i: number) {

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
