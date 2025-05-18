import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { MessageService } from '../../services/message.service'
import { CommonModule } from '@angular/common'
import { Message } from '../../models/message.model'
import { UserService } from '../../services/user.service'
import { FileService } from '../../services/file.service'
import { User } from '../../models/user.model'

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-message',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './message.component.html',
	styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
	@Input() message!: Message
	user?: User;
	file?: File;

	constructor(
		private _messageService: MessageService, 
		private _fileService: FileService,
		private _userService: UserService
	) {
		this._userService.getUserById(this.message.fromUserId).subscribe(user => {
			if (!user) {
				this.user = {
					id: '',
					name: ''
				}
			} else {
				this.user = user
			}
		})

		if (this.message.attachment) {
			this._fileService.getFile(this.message.attachment).subscribe(file => {
				this.file = file
			})
		}
	}
}
