import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Client';
  users: {id:number, userName:string}[]=[];

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get<{id:number, userName:string}[]>('https://localhost:5001/api/users').subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

}
