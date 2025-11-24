import { Component, ChangeDetectionStrategy, input, output, HostBinding } from '@angular/core';
import { Image } from '../../interfaces/image';

@Component({
  selector: 'app-image-item',
  imports: [],
  templateUrl: './image-item.html',
  styleUrl: './image-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageItem {
  image = input.required<Image>();
  isFeatured = input<boolean>(false);

  deleteImage = output<number>();

  @HostBinding('class.featured')
  get isFeaturedClass(): boolean {
    return this.isFeatured();
  }

  handleDelete(event: Event): void {
    event.stopPropagation();
    this.deleteImage.emit(this.image().id);
  }
}
