import { MessageService } from './../../_services/message.service';
import { MembersService } from './../../_services/members.service';
import { Member } from './../../_models/member';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Message } from 'src/app/_models/message';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  @ViewChild('memberTabs', {static: true}) memberTabs?: TabsetComponent;
  member: Member = {} as Member;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  activeTab?: TabDirective;
  messages: Message[] = [];

  constructor(private memberService:MembersService, private route: ActivatedRoute,
    private messageService: MessageService) { }

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
    if (this.activeTab.heading === 'Messages') {
      this.loadMessages();
    }
  }
}
