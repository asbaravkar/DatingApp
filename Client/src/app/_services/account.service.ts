import { User } from './../_models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl:string = 'https://localhost:5001/api/';
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model:{username:string, password:string}){
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((userResponse:User) => {
        if(userResponse){
          localStorage.setItem('user',JSON.stringify(userResponse));
          this.currentUserSource.next(userResponse);
        }
      })
    );
  }

  register(model:any){
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSource.next(user);
      })
    );
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }
}
