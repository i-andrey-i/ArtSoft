import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input, NO_ERRORS_SCHEMA } from '@angular/core'
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms'

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-custom-input',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './custom-input.component.html',
	styleUrls: ['./custom-input.component.scss'],
	schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: CustomInputComponent,
			multi: true
		}
	]
})
export class CustomInputComponent implements ControlValueAccessor {
	@Input() type = 'text'
	@Input() placeholder = ''
	@Input() disabled = false
	@Input() value: string = ''

	onInputChange(value: string): void {
		this.value = value
		this.onValueChange(value)
		this.onTouched()
	}

	writeValue(value: string): void {
		this.value = value
	}

	registerOnChange(fn: (value: string) => void): void {
		this.onValueChange = fn
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled
	}

	protected onValueChange: (value: string) => void = () => {}
	protected onTouched: () => void = () => {}
}
