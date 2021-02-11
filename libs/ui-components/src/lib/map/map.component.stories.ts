import { GoogleMapsModule } from '@angular/google-maps';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { MapComponent } from './map.component';

export default {
  title: 'Map'
};

export const Map = (args: { content: string }) => ({
  moduleMetadata: {
    declarations: [MapComponent],
    imports: [GoogleMapsModule, NgtUniversalModule]
  },
  component: MapComponent,
  props: {
    content: args.content
  }
});
