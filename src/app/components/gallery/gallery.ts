import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { Image } from '../../interfaces/image';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.html',
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
      author: 'Valentin Salja',
      width: 2000,
      height: 1333,
      url: 'https://unsplash.com/photos/0aX51h4WvAk',
      download_url: 'https://picsum.photos/id/238/300/200',
    },
    {
      id: 239,
      author: 'Paul Jarvis',
      width: 2000,
      height: 1600,
      url: 'https://unsplash.com/photos/6J--NXulQCs',
      download_url: 'https://picsum.photos/id/239/300/200',
    },
    {
      id: 240,
      author: 'Jonatan Pie',
      width: 3944,
      height: 2622,
      url: 'https://unsplash.com/photos/wLsqlndgrKA',
      download_url: 'https://picsum.photos/id/240/300/200',
    },
    {
      id: 241,
      author: 'Alex Perez',
      width: 2000,
      height: 1333,
      url: 'https://unsplash.com/photos/vSMcRlFkwVE',
      download_url: 'https://picsum.photos/id/241/300/200',
    },
    {
      id: 242,
      author: 'Phil Botha',
      width: 4000,
      height: 2667,
      url: 'https://unsplash.com/photos/v8bSMXfwCcY',
      download_url: 'https://picsum.photos/id/242/300/200',
    },
    {
      id: 243,
      author: 'Mike Petrucci',
      width: 3944,
      height: 2622,
      url: 'https://unsplash.com/photos/uIf6H1or1nE',
      download_url: 'https://picsum.photos/id/243/300/200',
    },
    {
      id: 244,
      author: 'Mike Meyers',
      width: 2000,
      height: 1333,
      url: 'https://unsplash.com/photos/3W7CKyMpgJM',
      download_url: 'https://picsum.photos/id/244/300/200',
    },
  ]);
}
