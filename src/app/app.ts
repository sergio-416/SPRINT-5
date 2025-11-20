import { Component } from '@angular/core';
import { Gallery } from './components/gallery/gallery';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [Gallery],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
