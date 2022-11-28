import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;
  users: {id:number, userName:string}[]=[];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this.http.get<{id:number, userName:string}[]>('https://localhost:5001/api/users').subscribe(
      response => {
        this.users = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

}
