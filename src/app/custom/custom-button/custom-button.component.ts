import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
	selector: 'app-custom-button',
	standalone: true,
	templateUrl: './custom-button.component.html',
	styleUrls: ['./custom-button.component.css'],
})
export class CustomButtonComponent {
	@Input() text: string = 'Button' // Текст кнопки
	@Input() color: string = '#007bff' // Цвет кнопки
	@Output() onClick = new EventEmitter<void>() // Событие клика

	// Метод для обработки клика
	handleClick(): void {
		this.onClick.emit()
	}
}
