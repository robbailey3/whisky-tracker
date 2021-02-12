import { GoogleMapsModule } from '@angular/google-maps';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { MapComponent } from './map.component';

export default {
  title: 'Map'
};

export const Map = (args: MapComponent) => ({
  moduleMetadata: {
    declarations: [MapComponent],
    imports: [GoogleMapsModule, NgtUniversalModule]
  },
  props: { ...args },
  template: `<rob-map 
  [centre]="centre" 
  [width]="width" 
  [height]="height" 
  [zoom]="zoom" 
  [useCurrentLocation]="useCurrentLocation">
  </rob-map>`
});

Map.args = {
  centre: {
    lat: 0,
    lng: 0
  },
  width: 800,
  height: 400,
  zoom: 6,
  useCurrentLocation: true
};
