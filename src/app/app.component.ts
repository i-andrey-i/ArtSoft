import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterModule } from '@angular/router'


@Component({
	selector: 'app-root',
	standalone: true,
	template: `
		<router-outlet></router-outlet>
	`,
	styles: [],
	imports: [RouterModule],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
	title = 'messenger'
}
