import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-file-upload',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="file-upload-container">
            <input
                type="file"
                (change)="onFileSelected($event)"
                accept="image/*,.pdf,.doc,.docx"
                class="file-input"
                #fileInput
            />
            <button class="upload-button" (click)="fileInput.click()">
                Upload File
            </button>
            <div *ngIf="selectedFile" class="file-info">
                Selected: {{ selectedFile.name }}
                <button (click)="uploadFile()">Send</button>
            </div>
        </div>
    `,
    styles: [
        `
            .file-upload-container {
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
                margin: 10px 0;
            }
            .file-input {
                display: none;
            }
            .upload-button {
                padding: 8px 16px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            .upload-button:hover {
                background-color: #0056b3;
            }
            .file-info {
                margin-top: 10px;
                padding: 8px;
                background-color: #f8f9fa;
                border-radius: 4px;
            }
        `,
    ],
})
export class FileUploadComponent {
    @Output() fileUploaded = new EventEmitter<File>();
    selectedFile: File | null = null;

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
        }
    }

    uploadFile(): void {
        if (this.selectedFile) {
            this.fileUploaded.emit(this.selectedFile);
            this.selectedFile = null;
        }
    }
}
