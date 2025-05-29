import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { User } from '@app/models/user.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user-card',
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="user-card">
      <div class="user-card-image"></div>
      <data>
        <h2>{{ user.name }}</h2>
      </data>
    </div>
  `,
  styles: `
    .user-card {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      border-radius: 36px;
      padding: 6px;
      cursor: pointer;

      &:hover {
        padding: 5px;
        border: 1px solid #172131;
      }

      h2 {
        font-size: 18px;
        color: #fff;
      }
    }

    .user-card-image {
        width: 64px;
        height: 64px;
        background: #1E252F;
        border-radius: 50%;
        object-fit: cover;
      }
  `
})
export class UserCardComponent {
  @Input() user!: User;
}
