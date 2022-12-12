import { ToastrService } from 'ngx-toastr';
import { MembersService } from './../../_services/members.service';
import { take } from 'rxjs';
import { AccountService } from './../../_services/account.service';
import { User } from './../../_models/user';
import { Member } from './../../_models/member';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm|undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event:any) {
    if(this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  member: Member|undefined;
  user: User|null = null;

  constructor(private accountService: AccountService, private memberService: MembersService,
    private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(
      user => {
        this.user = user;
      }
    );
   }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    if(!this.user) return;
    this.memberService.getMember(this.user.username).subscribe(
      member => {
        this.member = member;
      }
    );
  }

  updateProfile(){
    this.memberService.updateMember(this.editForm?.value).subscribe(
      _ => {
        this.toastr.success('Profile updated successfully!');
        this.editForm?.reset(this.member);
      }
    );
  }
}