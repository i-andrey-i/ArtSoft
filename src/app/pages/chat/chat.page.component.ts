import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChatComponent } from '../../components/chat/chat.component';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';
import { Message } from '../../models/message.model';
import { Chat } from '../../models/chat.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatComponent, HttpClientModule],
  providers: [UserService, MessageService],
  templateUrl: 'chat.page.component.html',
  styleUrls: ['chat.page.component.scss']
})
export class ChatPageComponent implements OnInit {
  selectedChat: Chat | null = null;

  constructor(
    private _userService: UserService,
    private _messageService: MessageService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      const chatId = params['id'];
      if (chatId) {
        this.loadChat(chatId);
      }
    });
  }

  loadChat(chatId: string): void {
    // In a real application, you would fetch the chat data from the service
    // For now, we'll use the same mock data as in main component
    const mockChats = [
      {
        id: '1',
        name: 'John Doe',
        lastMessage: {
          id: 101,
          fromUserId: '1',
          isRead: false,
          text: "Hello, how are you?",
          createdAt: '2025-04-28T10:15:00Z',
        },
        newMessagesCount: 2,
      },
      {
        id: '2',
        name: 'Jane Smith',
        lastMessage: {
          id: 102,
          fromUserId: '2',
          isRead: false,
          text: "Let's meet tomorrow.",
          createdAt: '2025-04-28T09:50:00Z',
        },
        newMessagesCount: 10,
      },
      {
        id: '3',
        name: 'Alice Johnson',
        lastMessage: {
          id: 103,
          fromUserId: '3',
          isRead: true,
          text: "Can you send me the file?",
          createdAt: '2025-04-28T08:30:00Z',
        },
        newMessagesCount: 0,
      },
    ] as Chat[];

    this.selectedChat = mockChats.find(chat => chat.id === chatId) || null;
  }

  onSendMessage(message: Message): void {
    if (this.selectedChat) {
      this._messageService.sendMessage({
        toUserId: this.selectedChat.id,
        text: message.text,
        createdAt: new Date().toLocaleString()
      }).subscribe(() => {});
    }
  }
} 