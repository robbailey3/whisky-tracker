import { FormsModule } from '@angular/forms';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { Component } from '@angular/core';
import { SliderComponent } from './slider.component';

@Component({ selector: 'rob-slider-host' })
class SliderHostComponent {
  public value = false;
}

describe('SliderComponent', () => {
  let spectator: SpectatorHost<SliderComponent, SliderHostComponent>;
  let component: SliderComponent;

  const hostFactory = createHostFactory({
    component: SliderComponent,
    host: SliderHostComponent,
    imports: [FormsModule]
  });

  beforeEach(() => {
    spectator = hostFactory<SliderHostComponent>(`
      <form ngForm #form="ngForm">
        <rob-slider
        label="label" 
        helperText="helperText" 
        id="checkbox-id" 
        name="name" 
        [(ngModel)]="value"
        required></rob-slider>
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
