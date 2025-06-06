import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-find-chat',
  imports: [ButtonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <button 
      class="find-chat" (click)="showDialog()"
    >write now</button>
  `,
  styleUrls: ['./find-chat.component.scss']
})
export class FindChatComponent {
  @Input() showDialog: () => void = () => {}
}

