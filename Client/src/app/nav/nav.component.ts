import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(public accountService: AccountService, private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.model).subscribe(
      userDto => {
        console.log(userDto);
        this.router.navigateByUrl('/members')
      }
    );
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
