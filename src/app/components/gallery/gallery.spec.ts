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

  describe('Container layout', () => {
    it('should have centered container with max width', () => {
      fixture.detectChanges();
      const container = compiled.querySelector('.container');

      expect(container).toBeTruthy();
      expect(container?.classList.contains('mx-auto')).toBe(true);
      expect(container?.classList.contains('max-w-7xl')).toBe(true);
    });

    it('should have consistent padding', () => {
      fixture.detectChanges();
      const container = compiled.querySelector('.container');

      expect(container?.classList.contains('px-4')).toBe(true);
      expect(container?.classList.contains('py-8')).toBe(true);
    });
  });

  describe('Responsive grid layout', () => {
    it('should apply mobile grid classes (2 columns)', () => {
      fixture.detectChanges();
      const gridContainer = compiled.querySelector('.grid');

      expect(gridContainer).toBeTruthy();
      expect(gridContainer?.classList.contains('grid-cols-2')).toBe(true);
    });

    it('should apply tablet grid classes (4 columns)', () => {
      fixture.detectChanges();
      const gridContainer = compiled.querySelector('.grid');

      expect(gridContainer?.classList.contains('md:grid-cols-4')).toBe(true);
    });

    it('should apply desktop grid classes (5 columns)', () => {
      fixture.detectChanges();
      const gridContainer = compiled.querySelector('.grid');

      expect(gridContainer?.classList.contains('lg:grid-cols-5')).toBe(true);
    });

    it('should have consistent gap between items', () => {
      fixture.detectChanges();
      const gridContainer = compiled.querySelector('.grid');

      expect(gridContainer?.classList.contains('gap-6')).toBe(true);
    });
  });

  describe('Featured image layout', () => {
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

  describe('Image deletion', () => {
    it('should have handleDelete method', () => {
      expect(component.handleDelete).toBeDefined();
      expect(typeof component.handleDelete).toBe('function');
    });

    it('should show confirmation dialog when deleting an image', () => {
      const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
      const imageId = component.images()[0].id;

      component.handleDelete(imageId);

      expect(confirmSpy).toHaveBeenCalledWith(expect.stringContaining('delete this image'));
      confirmSpy.mockRestore();
    });

    it('should remove image from array when user confirms deletion', () => {
      vi.spyOn(window, 'confirm').mockReturnValue(true);
      const initialLength = component.images().length;
      const imageToDelete = component.images()[2];

      component.handleDelete(imageToDelete.id);

      expect(component.images().length).toBe(initialLength - 1);
      expect(component.images().find((img) => img.id === imageToDelete.id)).toBeUndefined();
    });

    it('should NOT remove image when user cancels deletion', () => {
      vi.spyOn(window, 'confirm').mockReturnValue(false);
      const initialLength = component.images().length;
      const imageToDelete = component.images()[2];

      component.handleDelete(imageToDelete.id);

      expect(component.images().length).toBe(initialLength);
      expect(component.images().find((img) => img.id === imageToDelete.id)).toBeDefined();
    });

    it('should update state immutably when deleting', () => {
      vi.spyOn(window, 'confirm').mockReturnValue(true);
      const originalArray = component.images();
      const imageToDelete = component.images()[2];

      component.handleDelete(imageToDelete.id);

      expect(component.images()).not.toBe(originalArray);
    });

    it('should make second image featured when first image is deleted', () => {
      fixture.detectChanges();
      vi.spyOn(window, 'confirm').mockReturnValue(true);

      const originalSecondImageId = component.images()[1].id;
      const firstImageId = component.images()[0].id;

      component.handleDelete(firstImageId);
      fixture.detectChanges();

      expect(component.images()[0].id).toBe(originalSecondImageId);

      const firstImageItem = compiled.querySelector('app-image-item');
      const firstContainer = firstImageItem?.querySelector('[data-testid="image-container"]');
      expect(firstContainer?.classList.contains('featured-image')).toBe(true);
    });
  });
});
