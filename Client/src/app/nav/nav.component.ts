import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:{username: string, password: string} = {
    username: '',
    password: ''
  };

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.model).subscribe(
      userDto => {
        console.log(userDto);
      },
      errorRes =>{
        console.log(errorRes);
      }
    );
  }

  logout(){
    this.accountService.logout();
  }
}
