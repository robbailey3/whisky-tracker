import { forwardRef } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { WordCountDirective } from '../validators/word-count.directive';

import { TextareaComponent } from './textarea.component';

describe('TextareaComponent', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;
  let emitValueSpy: jest.SpyInstance;
  let textarea: HTMLTextAreaElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextareaComponent, WordCountDirective],
      imports: [FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
    component.maxWordCount = 500;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the ngModel when the value changes', fakeAsync(() => {
    component.change();
    console.log(component.value);
    fixture.detectChanges();
  }));
});
