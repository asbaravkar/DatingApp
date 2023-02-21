import { Observable, of } from 'rxjs';
import { ConfirmService } from './../_services/confirm.service';
import { MemberEditComponent } from './../members/member-edit/member-edit.component';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent> {

  constructor(private confirmService: ConfirmService){}

  canDeactivate(component: MemberEditComponent): Observable<boolean> {
    if(component.editForm?.dirty) {
      return this.confirmService.confirm();
    }
    return of(true);
  }

}
