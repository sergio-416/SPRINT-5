import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gallery } from './gallery';

describe('Gallery', () => {
  let component: Gallery;
  let fixture: ComponentFixture<Gallery>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gallery],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Gallery);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with 8 images', () => {
    expect(component.images().length).toBe(8);
  });

  it('should render all images in the DOM', () => {
    fixture.detectChanges();
    const imageElements = compiled.querySelectorAll('img');
    expect(imageElements.length).toBe(8);
  });

  it('should render images with correct src attribute', () => {
    fixture.detectChanges();
    const imageElements = compiled.querySelectorAll('img');
    const firstImage = component.images()[0];

    expect(imageElements[0].getAttribute('src')).toBe(firstImage.download_url);
  });

  it('should render images with descriptive alt text', () => {
    fixture.detectChanges();
    const imageElements = compiled.querySelectorAll('img');
    const firstImage = component.images()[0];

    expect(imageElements[0].getAttribute('alt')).toBe(`Photo by ${firstImage.author}`);
  });

  it('should render the gallery title', () => {
    fixture.detectChanges();
    const title = compiled.querySelector('h1');

    expect(title).toBeTruthy();
    expect(title?.textContent).toContain('Image Gallery');
  });

  it('should apply responsive grid classes', () => {
    fixture.detectChanges();
    const gridContainer = compiled.querySelector('.grid');

    expect(gridContainer).toBeTruthy();
    expect(gridContainer?.classList.contains('grid-cols-1')).toBe(true);
    expect(gridContainer?.classList.contains('md:grid-cols-2')).toBe(true);
    expect(gridContainer?.classList.contains('lg:grid-cols-3')).toBe(true);
    expect(gridContainer?.classList.contains('xl:grid-cols-4')).toBe(true);
  });

  it('should have all images with proper styling classes', () => {
    fixture.detectChanges();
    const imageElements = compiled.querySelectorAll('img');

    imageElements.forEach((img) => {
      expect(img.classList.contains('w-full')).toBe(true);
      expect(img.classList.contains('rounded-lg')).toBe(true);
      expect(img.classList.contains('shadow-md')).toBe(true);
    });
  });
});
