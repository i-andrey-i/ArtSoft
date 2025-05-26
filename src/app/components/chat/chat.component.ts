import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy, OnChanges } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { Message } from '../../models/message.model'
import { User } from '../../models/user.model'
import { MessageService } from '../../services/message.service'
import { Router } from '@angular/router'
import { trigger, transition, style, animate, query, stagger } from '@angular/animations'

@Component({
	selector: 'app-chat',
	standalone: true,
	imports: [FormsModule, CommonModule],
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('messageAnimation', [
			transition(':enter', [
				style({ opacity: 0, transform: 'translateY(20px)' }),
				animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
			])
		])
	]
})
export class ChatComponent implements OnInit, OnChanges {
	@Input() selectedChat: User | null = null
	@Output() messageSent = new EventEmitter<Message>()
	messages: Message[] = []
	newMessage = ''

	constructor(
		private _messageService: MessageService,
		private _router: Router
	) {}

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

	backToMain(): void {
		this._router.navigate(['/main']);
	}

	loadMessages(): void {
		if (this.selectedChat) {
			this._messageService
				.getMessages(this.selectedChat.id)
				.subscribe(messages => {
					this.messages = messages
				})
		}
	}

	onSendMessage(): void {
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
