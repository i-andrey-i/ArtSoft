import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-model',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="model-container">
            <!-- Model content will go here -->
        </div>
    `,
    styles: [
        `
            .model-container {
                /* Add your styles here */
            }
        `,
    ],
})
export class ModelComponent {
    @Input() data: any; 
}
