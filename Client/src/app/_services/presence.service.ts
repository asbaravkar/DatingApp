import { Router } from '@angular/router';
import { BehaviorSubject, take } from 'rxjs';
import { User } from './../_models/user';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { HubConnectionBuilder } from '@microsoft/signalr/dist/esm/HubConnectionBuilder';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection?: HubConnection;
  private onlineUserSource = new BehaviorSubject<string[]>([]); // changeDone
  onlineUsers$ = this.onlineUserSource.asObservable();

  constructor(private toastr: ToastrService, private router: Router) { }

  createHubConnection(user: User){
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(err => console.log(err));

    this.hubConnection.on('UserIsOnline', username => {
      this.onlineUsers$.pipe(take(1)).subscribe(
        usernames => this.onlineUserSource.next([...usernames, username])
      );
    });

    this.hubConnection.on('UserIsOffline', username => {
      this.toastr.warning(username + ' has disconnected');
      this.onlineUsers$.pipe(take(1)).subscribe(
        usernames => this.onlineUserSource.next(usernames.filter(x => x !== username))
      );
    });

    this.hubConnection.on('GetOnlineUsers', usernames => {
      this.onlineUserSource.next(usernames.result);
    });

    this.hubConnection.on('NewMessageReceived', ({username, knownAs}) => {
      this.toastr.info(knownAs + ' has sent you a new message! Click me to see it')
        .onTap
        .pipe(take(1))
        .subscribe(
          () => this.router.navigateByUrl('/members/' + username + '?tab=messages')
        );
    });
  }

  stopHubConnection() {
    this.hubConnection?.stop().catch(err => console.log(err));
  }
}
