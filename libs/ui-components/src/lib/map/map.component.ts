// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="google.maps" />
import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { WINDOW } from '@ng-toolkit/universal';

declare const google: any;

@Component({
  selector: 'rob-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild(GoogleMap) public map: google.maps.Map;

  @Input()
  width = 400;

  @Input() height = 400;

  @Input() centre: google.maps.LatLngLiteral;

  @Input() zoom = 5;

  @Input() useCurrentLocation = true;

  @Input() options: google.maps.MapOptions = { mapTypeId: 'hybrid' };

  public markers: google.maps.MarkerOptions[] = [];

  constructor(@Inject(WINDOW) public window: Window) {}

  public ngOnInit() {
    if (this.useCurrentLocation) {
      this.getCurrentLocation();
    }
  }

  public ngAfterViewInit() {
    console.log(this);
  }

  public getCurrentLocation() {
    window.navigator.geolocation.getCurrentPosition((position) => {
      this.centre = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.addMarker({
        position: this.centre,
        label: 'INIT MARKER',
        animation: google.maps.Animation.BOUNCE
      });
    });
  }

  public addMarker(newMarker: google.maps.MarkerOptions) {
    this.markers.push(newMarker);
  }
}
