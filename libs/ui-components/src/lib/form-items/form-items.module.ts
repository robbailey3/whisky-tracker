import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input/text-input.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { TextareaComponent } from './textarea/textarea.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { SelectComponent } from './select/select.component';
import { SliderComponent } from './slider/slider.component';



@NgModule({
  declarations: [TextInputComponent, CheckboxComponent, RadioButtonComponent, TextareaComponent, FileUploadComponent, SelectComponent, SliderComponent],
  imports: [
    CommonModule
  ]
})
export class FormItemsModule { }
