import { FormsModule } from '@angular/forms';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { Component } from '@angular/core';
import { SlideToggleComponent } from './slide-toggle.component';

@Component({ selector: 'rob-slide-toggle-host' })
class SliderHostComponent {
  public value = false;
}

describe('[COMPONENT]: SlideToggleComponent', () => {
  let spectator: SpectatorHost<SlideToggleComponent, SliderHostComponent>;
  let component: SlideToggleComponent;

  const hostFactory = createHostFactory({
    component: SlideToggleComponent,
    host: SliderHostComponent,
    imports: [FormsModule]
  });

  beforeEach(() => {
    spectator = hostFactory<SliderHostComponent>(`
      <form ngForm #form="ngForm">
        <rob-slide-toggle
        label="label" 
        helperText="helperText" 
        id="checkbox-id" 
        name="name" 
        [(ngModel)]="value"
        required></rob-slide-toggle>
      <form>`);
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle value on click', () => {
    const initialValue = spectator.hostComponent.value;

    const sliderEl = spectator.query('#checkbox-id');

    spectator.dispatchMouseEvent(sliderEl, 'click');

    expect(spectator.hostComponent.value).toEqual(!initialValue);
  });
});
