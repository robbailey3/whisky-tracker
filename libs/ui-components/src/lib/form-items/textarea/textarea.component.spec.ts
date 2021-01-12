import { forwardRef } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { By } from '@angular/platform-browser';
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
    emitValueSpy = jest.spyOn(component, 'change');
    textarea = fixture.nativeElement.querySelector('textarea');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the ngModel when the value changes', () => {
    const de = fixture.debugElement.query(By.css('textarea'));
    const el = de.nativeElement;

    fixture.detectChanges();

    el.value = 'My string';

    const event = new Event('input', {
      bubbles: true,
      cancelable: true
    });
    el.dispatchEvent(event);

    expect(emitValueSpy).toHaveBeenCalled();
  });
});
