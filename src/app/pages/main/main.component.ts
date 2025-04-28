import { Component, OnInit, HostListener } from '@angular/core'
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
	selector: 'app-main',
	standalone: true,
	imports: [CommonModule, FormsModule, ChatComponent, HttpClientModule],
	providers: [UserService, MessageService],
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit {
	chats: Chat[] = []
	filteredChats: Chat[] = []
	selectedChat: Chat | null = null
	searchQuery: string = ''

	constructor(
		private userService: UserService,
		private messageService: MessageService,
		private router: Router
	) {}

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
				last_message: {
					id: 101,
					from_user_id: '1',
					is_read: false,
					text: 'Hello, how are you?',
					created_at: '2025-04-28T10:15:00Z',
				},
				new_messages_count: 2,
			},
			{
				id: '2',
				name: 'Jane Smith',
				last_message: {
					id: 102,
					from_user_id: '2',
					is_read: false,
					text: 'Let’s meet tomorrow.',
					created_at: '2025-04-28T09:50:00Z',
				},
				new_messages_count: 10,
			},
			{
				id: '3',
				name: 'Alice Johnson',
				last_message: {
					id: 103,
					from_user_id: '3',
					is_read: true,
					text: 'Can you send me the file?',
					created_at: '2025-04-28T08:30:00Z',
				},
				new_messages_count: 0,
			},
		] as Chat[];
		this.filteredChats = this.chats;

	}

	onSearch(): void {
		this.messageService.getChats({
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
			this.messageService.sendMessage({
				to_user_id: this.selectedChat.id,
				text: message.text,
				created_at: new Date().toLocaleString()
			}).subscribe(() => {})
		}
	}

	sidebarWidth: number = 200; // Начальная ширина sidebar
	isResizing: boolean = false;

	onResizeStart(event: MouseEvent): void {
		this.isResizing = true;
		event.preventDefault();
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
}