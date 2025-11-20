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

  it('should render 8 ImageItem components', () => {
    fixture.detectChanges();
    const imageItems = compiled.querySelectorAll('app-image-item');
    expect(imageItems.length).toBe(8);
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

  describe('Featured image logic', () => {
    it('should apply featured-image class to the first image container', () => {
      fixture.detectChanges();

      const firstImageItem = compiled.querySelector('app-image-item');
      const firstContainer = firstImageItem?.querySelector('[data-testid="image-container"]');

      expect(firstContainer?.classList.contains('featured-image')).toBe(true);
    });

    it('should not apply featured-image class to other images', () => {
      fixture.detectChanges();

      const imageItems = compiled.querySelectorAll('app-image-item');

      for (let i = 1; i < imageItems.length; i++) {
        const container = imageItems[i].querySelector('[data-testid="image-container"]');
        expect(container?.classList.contains('featured-image')).toBe(false);
      }
    });
  });

  describe('Component integration', () => {
    it('should render all images correctly', () => {
      fixture.detectChanges();

      const images = compiled.querySelectorAll('img');
      expect(images.length).toBe(8);

      images.forEach((img, index) => {
        const expectedImage = component.images()[index];
        expect(img.getAttribute('src')).toBe(expectedImage.download_url);
        expect(img.getAttribute('alt')).toContain(expectedImage.author);
      });
    });
  });
});
