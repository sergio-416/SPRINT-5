import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gallery } from './gallery';
import { ImageItem } from '../image-item/image-item';

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
    it('should mark the first image as featured', () => {
      fixture.detectChanges();
      const imageItems = compiled.querySelectorAll('app-image-item');
      const firstImageItem = imageItems[0];

      expect(firstImageItem.hasAttribute('ng-reflect-is-featured')).toBe(true);
    });

    it('should not mark other images as featured', () => {
      fixture.detectChanges();
      const imageItems = compiled.querySelectorAll('app-image-item');

      for (let i = 1; i < imageItems.length; i++) {
        const imageItem = imageItems[i];
        const isFeaturedAttr = imageItem.getAttribute('ng-reflect-is-featured');
        expect(isFeaturedAttr === null || isFeaturedAttr === 'false').toBe(true);
      }
    });
  });

  describe('Component integration', () => {
    it('should pass image data to each ImageItem component', () => {
      fixture.detectChanges();
      const imageItems = compiled.querySelectorAll('app-image-item');
      const firstImage = component.images()[0];
      const firstImageItem = imageItems[0];

      expect(firstImageItem.getAttribute('ng-reflect-image')).toContain(firstImage.id.toString());
    });
  });
});
