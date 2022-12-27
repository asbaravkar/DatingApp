import { Pagination } from './../_models/pagination';
import { MembersService } from './../_services/members.service';
import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  members: Member[] | undefined;
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination|undefined;

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes(){
    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe(
      response => {
        this.members = response.result;
        this.pagination = response.pagination;
      }
    );
  }

  pageChanged(event: any){
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadLikes();
    }
  }
}
