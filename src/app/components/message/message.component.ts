import { CommonModule } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core'
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
export class MessageComponent implements AfterViewInit {
	@Input() message!: Message
	user?: User;

	constructor(
		private _messageService: MessageService, 
		private _fileService: FileService,
		private _elementRef: ElementRef
	) {}

	ngAfterViewInit(): void {
		const observedElement = this._elementRef.nativeElement

		const observer = new IntersectionObserver(() => {
		  if (!this.message.isRead) {
			this._messageService.read(this.message.id).subscribe({
				next: () => {
					this.message.isRead = true;
				},
			})
		  }
		})
		observer.observe(observedElement)
	  }
	  

	  downloadFile(): void {
		if (this.message.attachment) {
			this._fileService.download(this.message.attachment)
				.subscribe(file => {
					const url = window.URL.createObjectURL(file);
					const a = document.createElement('a');
					a.href = url;
					a.download = this.message.attachment || '';
					a.click();
					window.URL.revokeObjectURL(url);
				})
		}
	  }
}
