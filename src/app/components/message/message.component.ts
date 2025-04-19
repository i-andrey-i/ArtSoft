import { Component, Input } from '@angular/core'
import { MessageService } from '../../services/message.service'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'app-message',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './message.component.html',
	styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
	@Input() message!: MessageService
}
