import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ServerApiService} from "../server-api.service";

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.sass']
})
export class OnlineComponent implements OnInit, OnDestroy {
  serverUrl = "ws://localhost:3000/joinGame"
  // ws = new WebSocket(this.serverUrl )
  games: {name: string, value: string}[] = [
    {name: "1", value: ""},
    {name: "2", value: ""},
    {name: "3", value: ""},
    {name: "4", value: ""},
    ];

  gameIsActive

  constructor(private serverApi: ServerApiService) { }

  ngOnInit(): void {
    //console.log(this.ws)
    this.serverApi.getGames().subscribe((data: any[]) => {
      console.log(data);
      this.games = data;
    })
  }

  ngOnDestroy(): void {
  }




}
