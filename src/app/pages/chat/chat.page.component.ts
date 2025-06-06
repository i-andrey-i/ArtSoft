import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatComponent } from '../../components/chat/chat.component';
import { Message } from '../../models/message.model';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatComponent],
  providers: [UserService, MessageService],
  templateUrl: 'chat.page.component.html',
  styleUrls: ['chat.page.component.scss']
})
export class ChatPageComponent implements OnInit {
  messages: Message[] = [];
  chatId: string = '';

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.chatId = params['id'];
      
      if (!this.chatId) {
        this._router.navigate(['/main']);
      } 
    });
  }
} 