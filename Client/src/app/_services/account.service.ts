import { User } from './../_models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl:string = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model:{username:string, password:string}){
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((user:User) => {
        if(user){
          this.setCurrentUser(user);
        }
      })
    );
  }

  register(model:any){
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        this.setCurrentUser(user);
      })
    );
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User){
    localStorage.setItem('user',JSON.stringify(user));
    this.currentUserSource.next(user);
  }
}
