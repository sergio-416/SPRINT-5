import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageItem } from './image-item';

describe('ImageItem', () => {
  let component: ImageItem;
  let fixture: ComponentFixture<ImageItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageItem],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
