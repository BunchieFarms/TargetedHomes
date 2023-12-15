import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHandler, provideHttpClient, withJsonpSupport } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MapComponent } from "../map/map.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-main-map',
    standalone: true,
    template: `<app-map />`,
    styleUrl: './main-map.component.css',
    imports: [MapComponent, CommonModule, HttpClientModule]
})
export class MainMapComponent {

  apiLoaded: Observable<boolean>;

  constructor(httpClient: HttpClient) {
    // If you're using the `<map-heatmap-layer>` directive, you also have to include the `visualization` library
    // when loading the Google Maps API. To do so, you can add `&libraries=visualization` to the script URL:
    // https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization

    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=[Key]', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }
}