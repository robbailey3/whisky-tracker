import { ElementRef } from '@angular/core';
import { WordCountDirective } from './word-count.directive';

describe('WordCountDirective', () => {
  it('should create an instance', () => {
    const el = document.createElement('textarea');
    const directive = new WordCountDirective(new ElementRef(el));
    expect(directive).toBeTruthy();
  });
});
