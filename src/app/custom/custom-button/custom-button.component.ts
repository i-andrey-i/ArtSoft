import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, NO_ERRORS_SCHEMA } from '@angular/core'

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,selector: 'app-custom-button',
	standalone: true,
	templateUrl: './custom-button.component.html',
	styleUrls: ['./custom-button.component.scss'],
	schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CustomButtonComponent {
	@Input() text: string = 'Button' // Текст кнопки
	@Input() color: string = '#007bff' // Цвет кнопки
	@Input() disabled: boolean = false
	protected onClick = new EventEmitter<void>() // Событие клика

	// Метод для обработки клика
	handleClick(): void {
		this.onClick.emit()
	}
}
