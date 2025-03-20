import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
	selector: 'app-custom-input',
  standalone: true,
	templateUrl: './custom-input.component.html', // Указываем путь к HTML
	styleUrls: ['./custom-input.component.scss'], // Указываем путь к CSS
})
export class CustomInputComponent {
	@Input() type: 'email' | 'password' | 'text' = 'text' // Тип input поля
	@Input() placeholder: string = '' 
	@Input() value: string = '' // Значение input поля
	@Output() valueChange = new EventEmitter<string>() // Событие изменения значения

	// Метод для обновления значения
	onInputChange(event: Event): void {
		const target = event.target as HTMLInputElement
		this.value = target.value
		this.valueChange.emit(this.value)
	}
}
