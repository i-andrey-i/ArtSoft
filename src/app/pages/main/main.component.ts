import { Component, OnInit, HostListener, ChangeDetectionStrategy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ChatComponent } from '../../components/chat/chat.component'
import { MessageService } from '../../services/message.service'
import { UserService } from '../../services/user.service'
import { Message } from '../../models/message.model'
import { Chat } from '../../models/chat.model'
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-main',
	standalone: true,
	imports: [CommonModule, FormsModule, ChatComponent, HttpClientModule],
	providers: [UserService, MessageService],
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit {

	sidebarWidth: number = 200; // Начальная ширина sidebar
	isResizing: boolean = false;

	chats: Chat[] = []
	filteredChats: Chat[] = []
	selectedChat: Chat | null = null
	searchQuery: string = ''

	constructor(
		private _userService: UserService,
		private _messageService: MessageService,
		private _router: Router
	) {
		this._userService.getMe().subscribe(user => {
			console.log(user)
		})
	}

	@HostListener('document:mousemove', ['$event'])
	onResizing(event: MouseEvent): void {
		if (this.isResizing) {
			const newWidth = event.clientX;
			if (newWidth > 100 && newWidth < 600) {
				this.sidebarWidth = newWidth;
			}
		}
	}

	@HostListener('document:mouseup')
	onResizeEnd(): void {
		this.isResizing = false;
	}

	ngOnInit(): void {
		this.loadUsers()
	}

	loadUsers(): void {
		/*
		this.messageService.getChats().subscribe(chats => {
			this.chats = chats;
			this.filteredChats = chats;
		})

		 */
		// Временные данные для верстки
		this.chats = [
			{
				id: '1',
				name: 'John Doe',
				lastMessage: {
					id: 101,
					fromUserId: '1',
					isRead: false,
					text: 'Hello, how are you?',
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
					text: 'Let’s meet tomorrow.',
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
					text: 'Can you send me the file?',
					createdAt: '2025-04-28T08:30:00Z',
				},
				newMessagesCount: 0,
			},
		] as Chat[];
		this.filteredChats = this.chats;

	}

	onSearch(): void {
		this._messageService.getChats({
			search: this.searchQuery
		})
		.subscribe(chats => {
			this.filteredChats = chats
		})
	}

	selectChat(chat: Chat): void {
		this.selectedChat = chat
	}

	onSendMessage(message: Message): void {
		if (this.selectedChat) {
			this._messageService.sendMessage({
				toUserId: this.selectedChat.id,
				text: message.text,
				createdAt: new Date().toLocaleString()
			}).subscribe(() => {})
		}
	}

	onResizeStart(event: MouseEvent): void {
		this.isResizing = true;
		event.preventDefault();
	}
}