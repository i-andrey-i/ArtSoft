import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ChatComponent } from '../../components/chat/chat.component'
import { MessageService } from '../../services/message.service'
import { UserService } from '../../services/user.service'
import { Message } from '../../models/message.model'
import { Chat } from '../../models/chat.model'


@Component({
	selector: 'app-main',
	standalone: true,
	imports: [CommonModule, FormsModule, ChatComponent],
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
		private messageService: MessageService
	) {}

	ngOnInit(): void {
		this.loadUsers()
	}

	loadUsers(): void {
		this.messageService.getChats().subscribe(chats => {
			this.chats = chats;
			this.filteredChats = chats;
		})
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
}
