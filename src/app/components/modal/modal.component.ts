import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FindChatComponent } from '@app/components/find-chat/find-chat.component';
import { UserCardComponent } from '@app/components/user-card/user-card.component';
import { User } from '@app/models/user.model';
import { UserService } from '@app/services/user.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-modal',
  imports: [CommonModule, DialogModule, FindChatComponent, ButtonModule, UserCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <app-find-chat [showDialog]="showDialog"></app-find-chat>
    <p-dialog header="Enter a name" [modal]="true" [(visible)]="visible" [style]="{ width: 'calc(100dvw - 16vw)', background: '#13171D', border: 'none'  }">
      <input placeholder="Enter a name" class="modal-input" (input)="search($event)"/>
        <ul class="user-list">
        <ng-container *ngFor="let user of users">
          <li>
            <app-user-card [user]="user" (click)="openChat(user)"></app-user-card>
          </li>
        </ng-container>
      </ul>
    </p-dialog>
  `,
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  visible: boolean = false;
  users: User[] = [];

  constructor(private _router: Router, private _userService: UserService) {
    this._userService.getUsers({
      limit: 5,
      offset: 0
    }).subscribe({
      next: (users) => {
        this.users = users;
      },
      error: () => {
        this.users = [];
      }
    });
  }
  
  showDialog: () => void = () => {
    this.visible = true;
  }

  search(e: Event): void {
    const input = e.target as HTMLInputElement;
    const value = input.value;
  
    this._userService.getUsers({
      search: value,
      limit: 5,
      offset: 0
    }).subscribe({
      next: (users) => {
        this.users = users;
      },
      error: () => {
        this.users = [];
      }
    });
  }

  openChat(user: User): void {
    this._router.navigate(['/chat', user.id]);
  }
}
