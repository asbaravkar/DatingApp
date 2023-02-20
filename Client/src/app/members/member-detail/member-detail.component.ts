import { take } from 'rxjs';
import { User } from './../../_models/user';
import { AccountService } from './../../_services/account.service';
import { PresenceService } from './../../_services/presence.service';
import { MessageService } from './../../_services/message.service';
import { MembersService } from './../../_services/members.service';
import { Member } from './../../_models/member';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Message } from 'src/app/_models/message';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, OnDestroy {

  @ViewChild('memberTabs', {static: true}) memberTabs?: TabsetComponent;
  member: Member = {} as Member;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  activeTab?: TabDirective;
  messages: Message[] = [];
  user?: User;

  constructor(private accountService: AccountService, private route: ActivatedRoute,
    private messageService: MessageService, public presenceService: PresenceService,
    private router: Router) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(
        user => {
          if (user) {
            this.user = user;
          }
        }
      );
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngOnInit(): void {
    this.route.data.subscribe(
      data => this.member = data['member']
    );

    this.route.queryParams.subscribe(
      params => {
        params['tab'] && this.selectTab(params['tab']);
      }
    );

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];

    this.galleryImages = this.getImages();
  }

  ngOnDestroy() {
    this.messageService.stopHubConnection();
  }
  // ngAfterViewInit() {
  //   this.route.queryParams.subscribe(
  //     params => {
  //       this.selectTab(params['tab']);
  //     }
  //   );
  // }

  getImages(){
    if(!this.member) return [];
    const imageUrls = [];
    for(const photo of this.member.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      });
    }
    return imageUrls;
  }

  // loadMember(){
  //   var username = this.route.snapshot.paramMap.get('username');
  //   if(!username) return;
  //   this.memberService.getMember(username).subscribe(
  //     member => {
  //       this.member = member;
  //       this.galleryImages = this.getImages();
  //     }
  //   );
  // }

  selectTab(heading: string) {
    if(this.memberTabs) {
      this.memberTabs.tabs.find(x => x.heading === heading)!.active = true;
    }
  }

  loadMessages() {
    if(this.member) {
      this.messageService.getMessageThread(this.member.userName).subscribe(
        messages => this.messages = messages
      );
    }
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.user) {
      // this.loadMessages();
      this.messageService.createHubConnection(this.user, this.member.userName);
    } else {
      this.messageService.stopHubConnection();
    }
  }
}
