import { Component, DebugElement, ViewChild } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { WordCountDirective } from '../validators/word-count.directive';

import { TextareaComponent } from './textarea.component';

@Component({
  template: `<form #form="ngForm">
    <rob-textarea
      maxWordCount="200"
      name="textAreaValue"
      [formControl]="textAreaFormControl"
    ></rob-textarea>
  </form>`,
  selector: 'rob-test-textarea'
})
class TestTextAreaComponent {
  @ViewChild(TextareaComponent) public textArea: TextareaComponent;

  public textAreaFormControl = new FormControl('');
}

describe('TextareaComponent', () => {
  let hostComponent: TestTextAreaComponent;
  let hostFixture: ComponentFixture<TestTextAreaComponent>;
  let spy: jest.SpyInstance;
  let textArea: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TestTextAreaComponent,
        TextareaComponent,
        WordCountDirective
      ],

      imports: [ReactiveFormsModule, FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestTextAreaComponent);
    hostComponent = hostFixture.componentInstance;
    textArea = hostFixture.debugElement.query(By.css('rob-textarea'));
    hostFixture.detectChanges();
    spy = jest.spyOn(hostComponent.textArea, 'change');
  });

  it('should create', () => {
    expect(hostComponent.textArea).toBeTruthy();
  });

  it('should', fakeAsync(() => {
    const input = textArea.query(By.css('textarea'));
    input.triggerEventHandler('input', {});
    expect(spy).toHaveBeenCalled();
  }));
});
