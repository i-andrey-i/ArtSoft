import { animate, style, transition, trigger } from '@angular/animations'
import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { User } from '@app/models/user.model'
import { UserService } from '@app/services/user.service'
import { Message } from '../../models/message.model'
import { MessageService } from '../../services/message.service'

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
export class ChatComponent implements OnInit {
	@Input() chatId: string | undefined = undefined;

	messages: Message[] = []
	selectedChat?: User;
	isEmptyChat: boolean = false
	newMessage: string = ''

	constructor(
		private _userService: UserService,
		private _messageService: MessageService,
		private _router: Router,
	) {
	}

	ngOnInit(): void {
		if (this.chatId) {
			this.loadChatInfo()
			this.loadMessages()	
		}
	}

	backToMain(): void {
		this._router.navigate(['/main']);
	}

	loadChatInfo(): void {
		if (this.chatId) {
			this._userService.getUserById(this.chatId).subscribe({
				next: (user) => {
					this.selectedChat = user;
				},
				error: () => {
					this.isEmptyChat = true;
				}
			})
		}
	}
	loadMessages(): void {
		if (this.chatId) {
			this._messageService
				.getMessages(this.chatId, {
					limit: 100,
					offset: 0
				})
				.subscribe({
					next: (messages) => {
						this.messages = messages
					},
					error: () => {
						this.isEmptyChat = true;
					}
			})
		}
	}

	onSendMessage(): void {
	}
}
