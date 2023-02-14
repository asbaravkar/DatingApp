import { AccountService } from './../_services/account.service';
import { Directive, TemplateRef, ViewContainerRef, OnInit, Input } from '@angular/core';
import { take } from 'rxjs';
import { User } from '../_models/user';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit{

  user: User = {} as User;
  @Input() appHasRole: string[] = [];

  constructor(private viewContainerRef: ViewContainerRef, private templateRef:TemplateRef<any>,
    private accountService:AccountService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(
        user => {
          if (user) this.user = user;
        }
      );
  }
  ngOnInit(): void {
    if (this.user.roles.some(r => this.appHasRole.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
