import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { ImageItem } from '../image-item/image-item';
import { Image } from '../../interfaces/image';

@Component({
  selector: 'app-gallery',
  imports: [ImageItem],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Gallery {
  images = signal<Image[]>([
    {
      id: 237,
      author: 'André Spieker',
      width: 3500,
      height: 2095,
      url: 'https://unsplash.com/photos/8wTPqxlnKM4',
      download_url: 'https://picsum.photos/id/237/300/200',
    },
    {
      id: 238,
      author: 'Fabrice Villard',
      width: 3000,
      height: 2000,
      url: 'https://unsplash.com/photos/Du41jIaI5Ww',
      download_url: 'https://picsum.photos/id/238/300/200',
    },
    {
      id: 239,
      author: 'Garrett Sears',
      width: 3000,
      height: 2000,
      url: 'https://unsplash.com/photos/ECoFf_q3tdQ',
      download_url: 'https://picsum.photos/id/239/300/200',
    },
    {
      id: 240,
      author: 'Kelley Bozarth',
      width: 3000,
      height: 1800,
      url: 'https://unsplash.com/photos/8Gq-aL7Nlps',
      download_url: 'https://picsum.photos/id/240/300/200',
    },
    {
      id: 241,
      author: 'Rachel Williams',
      width: 3000,
      height: 2000,
      url: 'https://unsplash.com/photos/l5if0iQfV4c',
      download_url: 'https://picsum.photos/id/241/300/200',
    },
    {
      id: 242,
      author: 'Tim Gouw',
      width: 3000,
      height: 2000,
      url: 'https://unsplash.com/photos/7CDFZsNM7Qg',
      download_url: 'https://picsum.photos/id/242/300/200',
    },
    {
      id: 243,
      author: 'Darren Nunis',
      width: 3000,
      height: 2000,
      url: 'https://unsplash.com/photos/bYDj8nE8lbo',
      download_url: 'https://picsum.photos/id/243/300/200',
    },
    {
      id: 244,
      author: 'Shaun Bell',
      width: 3000,
      height: 2000,
      url: 'https://unsplash.com/photos/C5pVBmGz58k',
      download_url: 'https://picsum.photos/id/244/300/200',
    },
  ]);

  handleDelete(imageId: number): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete this image? This action cannot be undone.'
    );

    if (confirmed) {
      const updatedImages = this.images().filter((image) => image.id !== imageId);
      this.images.set(updatedImages);
    }
  }
}
