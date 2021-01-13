import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'rob-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ]
})
export class TextareaComponent {
  @Input() label: string;

  @Input() id: string;

  @Input() name: string;

  @Input() placeholder: string;

  @Input() helperText: string;

  @Input() minLength: number;

  @Input() maxLength: number;

  @Input() maxWordCount: number;

  @Input() required: boolean;

  @Input() rows = 20;

  @Input() cols = 20;

  public disabled = false;

  public value = '';

  public wordCount = 0;

  public onTouched: () => any;

  public onChange: (value: string) => any;

  public writeValue(value: string) {
    this.value = value;
    this.wordCount = value ? value.split(/\s/gm).length : 0;
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  public change() {
    console.log('CHANGE HAS BEEN CALLED');
    this.wordCount = this.value ? this.value.split(/\s/gm).length : 0;
    this.onChange(this.value);
  }
}
