import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { Message } from '../../models/message.model'
import { User } from '../../models/user.model'
import { FileService } from '../../services/file.service'
import { MessageService } from '../../services/message.service'

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-message',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './message.component.html',
	styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnChanges {
	@Input() message!: Message
	user?: User;
	file?: File;

	constructor(
		private _messageService: MessageService, 
		private _fileService: FileService,
	) {
		if (this.message?.attachment !== undefined) {
			this._fileService.getFile(this.message.attachment).subscribe(file => {
				this.file = file
			})
		}
	}

	ngOnChanges(changes: SimpleChanges): void {	
		if (changes['message']) {
			console.log(this.message)
		}
	}

	ngOnO
}
