import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { Message } from '../../models/message.model'
import { User } from '../../models/user.model'
import { MessageService } from '../../services/message.service'

@Component({
	selector: 'app-chat',
	standalone: true,
	imports: [FormsModule, CommonModule],
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
	@Input() selectedChat: User | null = null
	@Output() messageSent = new EventEmitter<Message>()
	messages: Message[] = []
	newMessage = ''

	constructor(private messageService: MessageService) {}

	ngOnInit(): void {
		if (this.selectedChat) {
			this.loadMessages()
		}
	}

	ngOnChanges(): void {
		if (this.selectedChat) {
			this.loadMessages()
		}
	}

	loadMessages(): void {
		if (this.selectedChat) {
			this.messageService
				.getMessages(this.selectedChat.id)
				.subscribe(messages => {
					this.messages = messages
				})
		}
	}

	onSendMessage() {
		if (this.newMessage.trim() && this.selectedChat) {
			//const message: Omit<Message, 'id'> = {
			//	
			//}
			//this.messages = [...this.messages, message]
			//this.messageSent.emit(message)
			this.newMessage = ''
		}
	}
}
