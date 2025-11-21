import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Image } from '../../interfaces/image';

@Component({
  selector: 'app-image-item',
  standalone: true,
  imports: [],
  templateUrl: './image-item.html',
  styleUrl: './image-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.featured]': 'isFeatured()',
  },
})
export class ImageItem {
  image = input.required<Image>();
  isFeatured = input<boolean>(false);
}
