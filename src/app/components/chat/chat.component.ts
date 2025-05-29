import { animate, style, transition, trigger } from '@angular/animations'
import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { User } from '@app/models/user.model'
import { UserService } from '@app/services/user.service'
import { Message } from '../../models/message.model'
import { MessageService } from '../../services/message.service'
import { MessageComponent } from '../message/message.component'

@Component({
	selector: 'app-chat',
	standalone: true,
	imports: [FormsModule, CommonModule, MessageComponent],
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
	@Input() chatId!: string;

	messages: Message[] = []
	selectedChat: User | null = null;
	isEmptyChat: boolean = false
	newMessage: string = ''
	me: User = {} as User;

	constructor(
		private _userService: UserService,
		private _messageService: MessageService,
		private _router: Router,
		private _cdr: ChangeDetectorRef
	) {
		this._userService.getMe().subscribe({
			next: (user: User) => {
				this.me = user;
				this._cdr.markForCheck();
			},
			error: () => {
				this._router.navigate(['/login']);
			}
		})
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['chatId']) {
			this.loadChatInfo();
			this.loadMessages();
		}
	}

	ngOnInit(): void {
		this.loadChatInfo()
		this.loadMessages()	
	}

	backToMain(): void {
		this._router.navigate(['/main']);
	}

	loadChatInfo(): void {
		this._userService.getUserById(this.chatId).subscribe({
			next: (user) => {
				if (user) {
					this.selectedChat = user;
				} else {
					this.isEmptyChat = true;
				}
				this._cdr.markForCheck();
			},
			error: () => {
				this.isEmptyChat = true;
				this._cdr.markForCheck();
			}
		})
	}

	loadMessages(): void {
		this._messageService
			.getMessages(this.chatId, {
				limit: 100,
				offset: 0
			})
			.subscribe({
				next: (messages) => {
					this.messages = messages.map((e) => {
						if (e.fromUserId == this.me.id) {
							e.active = true;
						}

						return e;
					});
					this._cdr.markForCheck();
				}
		})
	}

	onSendMessage(): void {
		if (this.newMessage.trim() === '') {
			return;
		}

		this._messageService.sendMessage({
			toUserId: this.chatId,
			text: this.newMessage,
			createdAt: new Date().toISOString(),
		}).subscribe({
			next: (e) => {
				this.messages.push({
					id: e,
					text: this.newMessage,
					createdAt: new Date().toISOString(),
					fromUserId: this.me.id,
					isRead: false,
					active: true,
				});
				this.newMessage = '';
				this._cdr.markForCheck();
				this.loadMessages();
			}
		})
	}
}
