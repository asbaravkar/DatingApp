import { PresenceService } from './../../_services/presence.service';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from './../../_services/members.service';
import { Member } from './../../_models/member';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() member: Member | undefined;

  constructor(private memberService: MembersService, private toastr: ToastrService,
    public presenceService: PresenceService) { }

  ngOnInit(): void {
    this.presenceService.onlineUsers$.subscribe(
      usernames => {
        if(usernames) {
          console.log([...usernames])
        }
      }
    )
  }

  addLike(member: Member){
    this.memberService.addLike(member.userName).subscribe(
      _ => {
        this.toastr.success('You have liked ' + member.knownAs);
      }
    );
  }

}
