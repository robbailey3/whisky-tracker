import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let spectator: Spectator<MapComponent>;
  let component: MapComponent;

  const componentFactory = createComponentFactory({
    component: MapComponent,
    imports: [NgtUniversalModule],
    schemas: [NO_ERRORS_SCHEMA]
  });

  beforeEach(() => {
    spectator = componentFactory();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('[METHOD] addMarker', () => {
    it('should add a marker to the markers array', () => {
      const initialMarkersLength = component.markers.length;

      component.addMarker({ position: { lat: 0, lng: 0 } });

      expect(component.markers.length).toEqual(initialMarkersLength + 1);
    });
  });
});
