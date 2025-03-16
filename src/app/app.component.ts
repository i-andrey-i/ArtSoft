import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
	selector: 'app-root',
	standalone: true,
	template: `
		<nav>
			<p><a routerLink="/">Home</a></p>
			<p><a routerLink="/registration">Registration</a></p>
		</nav>
		<router-outlet></router-outlet>
	`,
	styles: [],
  imports:[RouterModule],
})
export class AppComponent {
	title = 'messenger'
}
