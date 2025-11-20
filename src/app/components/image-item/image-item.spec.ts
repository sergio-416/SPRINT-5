import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageItem } from './image-item';
import { Image } from '../../interfaces/image';

describe('ImageItem', () => {
  let component: ImageItem;
  let fixture: ComponentFixture<ImageItem>;
  let compiled: HTMLElement;

  const mockImage: Image = {
    id: 237,
    author: 'André Spieker',
    width: 3500,
    height: 2095,
    url: 'https://unsplash.com/photos/8wTPqxlnKM4',
    download_url: 'https://picsum.photos/id/237/300/200',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageItem],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageItem);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    fixture.componentRef.setInput('image', mockImage);
    expect(component).toBeTruthy();
  });

  describe('Input signals', () => {
    it('should receive image input signal', () => {
      fixture.componentRef.setInput('image', mockImage);
      expect(component.image()).toEqual(mockImage);
    });

    it('should receive isFeatured input signal with default false', () => {
      fixture.componentRef.setInput('image', mockImage);
      expect(component.isFeatured()).toBe(false);
    });

    it('should receive isFeatured input signal when set to true', () => {
      fixture.componentRef.setInput('image', mockImage);
      fixture.componentRef.setInput('isFeatured', true);
      expect(component.isFeatured()).toBe(true);
    });
  });

  describe('Image rendering', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('image', mockImage);
      fixture.detectChanges();
    });

    it('should render an img element', () => {
      const imgElement = compiled.querySelector('img');
      expect(imgElement).toBeTruthy();
    });

    it('should render image with correct src attribute', () => {
      const imgElement = compiled.querySelector('img');
      expect(imgElement?.getAttribute('src')).toBe(mockImage.download_url);
    });

    it('should render image with descriptive alt text', () => {
      const imgElement = compiled.querySelector('img');
      expect(imgElement?.getAttribute('alt')).toBe(`Photo by ${mockImage.author}`);
    });

    it('should apply base styling classes to image', () => {
      const imgElement = compiled.querySelector('img');
      expect(imgElement?.classList.contains('w-full')).toBe(true);
      expect(imgElement?.classList.contains('h-auto')).toBe(true);
      expect(imgElement?.classList.contains('rounded-lg')).toBe(true);
      expect(imgElement?.classList.contains('shadow-md')).toBe(true);
    });
  });

  describe('Featured image styling', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('image', mockImage);
    });

    it('should NOT apply featured class when isFeatured is false', () => {
      fixture.componentRef.setInput('isFeatured', false);
      fixture.detectChanges();

      const container = compiled.querySelector('[data-testid="image-container"]');
      expect(container?.classList.contains('featured-image')).toBe(false);
    });

    it('should apply featured class when isFeatured is true', () => {
      fixture.componentRef.setInput('isFeatured', true);
      fixture.detectChanges();

      const container = compiled.querySelector('[data-testid="image-container"]');
      expect(container?.classList.contains('featured-image')).toBe(true);
    });
  });
});
