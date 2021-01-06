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

  @Input() rows: number;

  @Input() cols: number;

  public disabled = false;

  public value: string;

  public wordCount = 0;

  public onChange: (value: string) => any;

  public onTouched: () => any;

  public writeValue(value: string) {
    this.value = value;
    this.wordCount = value.split(/\s/gm).length;
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
    this.wordCount = this.value.split(/\s/gm).length;
    console.log(this.wordCount);
    this.onChange(this.value);
  }
}
