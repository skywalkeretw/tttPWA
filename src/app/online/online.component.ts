import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ServerApiService} from "../server-api.service";

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.sass']
})
export class OnlineComponent implements OnInit, OnDestroy {

  private ws: WebSocket;
  games: {name: string, value: string}[] = [
    {name: "1", value: ""},
    {name: "2", value: ""},
    {name: "3", value: ""},
    {name: "4", value: ""},
    ];

  gameIsActive: boolean;

  constructor(private serverApi: ServerApiService) { }

  ngOnInit(): void {
    //console.log(this.ws)
    this.serverApi.getGames().subscribe((data: any[]) => {
      console.log(data);
      this.games = data;
    })
    this.getGames()
    this.gameIsActive = false;
  }

  ngOnDestroy(): void {
  }


  getGames() {
    //call data from api
  }

  joinGame(id: string) {
    const url = "ws://localhost:3000/joinGame"
    this.ws = new WebSocket(url)


  }

  createGame() {
    const url = "ws://localhost:3000/createGame"
    this.ws = new WebSocket(url)

  }




}
