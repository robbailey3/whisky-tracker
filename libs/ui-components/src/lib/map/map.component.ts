// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="google.maps" />
import {
  AfterViewChecked,
  Component,
  Inject,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'rob-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild(GoogleMap) public map: google.maps.Map;

  @Input()
  width = 400;

  @Input() height = 400;

  @Input() centre: google.maps.LatLngLiteral;

  @Input() zoom = 5;

  @Input() useCurrentLocation = true;

  @Input() options: google.maps.MapOptions = {};

  public markers: google.maps.MarkerOptions[] = [];

  constructor(@Inject(WINDOW) public window: Window) {}

  public ngOnInit() {
    if (this.useCurrentLocation) {
      this.getCurrentLocation();
    }
  }

  public getCurrentLocation() {
    if ('navigator' in window && 'geolocation' in window.navigator) {
      this.window.navigator.geolocation.getCurrentPosition((position) => {
        this.centre = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }

  public addMarker(newMarker: google.maps.MarkerOptions) {
    this.markers.push(newMarker);
  }
}
