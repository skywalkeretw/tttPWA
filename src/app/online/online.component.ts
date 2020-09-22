import {Component, OnDestroy, OnInit} from '@angular/core';
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
  uid: string

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.ws = new WebSocket(this.url)
    this.gameIsActive = false;
    this.clearData()
    let ws = this.ws
    ws.onopen = function () {
      ws.send(JSON.stringify(
        {
          action:"getGames",
          data: {}
        }
      ));
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
          this.snackBar("You created A new Game. You are Player X");
          this.uid = this.data.playerx;
          break;
        case "joinGame":
          this.data = parsedData.data;
          this.snackBar("You Joined Game " + this.data.name + " You are Player O");
          this.uid = this.data.playero;
          break;
        case "startGame":
          this.data = parsedData.data;
          this.snackBar("New Game has started");
          break;
        case "move":
          this.data = parsedData.data;
          console.log(this.data)
          break;
        case "playerLeft":
          this.data = parsedData.data
          this.uid = this.data.playerx === this.uid ? this.uid : this.data.playero
          break;
        case "leaveGame":
          this.gameIsActive = false;
          this.clearData()
          break;
      }
    })
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

          }
        }
      ));
      this.gameIsActive = true
    }
  }

  newGame() {
    if (this.gameIsActive) {
      this.ws.send(JSON.stringify(
        {
          action:"newGame",
          data: {
            gameId: this.data.gameId
          }
        }
      ));
      this.gameIsActive = true
    }
  }

  makeMove(i: number) {
    if (this.gameIsActive) {
      this.ws.send(JSON.stringify(
        {
          action:"makeMove",
          data: {
            gameId: this.data.gameId,
            move: i,
          }
        }
      ));
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

  clearData() {
    this.data = {
      gameId: "",
      name: "",
      playerx: "", //player 1 id
      playero: "", //player 2 id
      gameData: {
        squares: [],
        xIsNext: false,
        winner: null,
        moveCounter: 0,
        score: {x: 0, o: 0, draw: 0},
      }
    }
  }

  leaveGame() {
    if (this.gameIsActive) {
      this.ws.send(JSON.stringify(
        {
          action:"leaveGame",
          data: {
            gameId: this.data.gameId,
          }
        }
      ));
    }
  }
}
