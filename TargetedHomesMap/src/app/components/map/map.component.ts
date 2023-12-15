import { Component, ViewChild } from '@angular/core';
import { GoogleMapsModule, MapInfoWindow, MapMarker, MapPolyline } from '@angular/google-maps';
import { TargetResponse } from '../../models/TargetResponse';
import { ApiServiceService } from '../../services/api-service.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { ClosestTargetResponse } from '../../models/ClosestTargetResponse';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  imports: [GoogleMapsModule, MatFormFieldModule, MatInputModule, FormsModule, MatIconModule, MatButtonModule]
})
export class MapComponent {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  
  center: google.maps.LatLngLiteral = {lat: 35.5, lng: -80};
  zoom = 8;

  targetLocs: TargetResponse[] = [];
  markers: MarkerAttribute[] = [];
  selectedMarker: MarkerAttribute = new MarkerAttribute();
  routeTo: google.maps.LatLng[] = [];
  distanceToTarget: string = '';
  durationToTarget: string = '';
  closestTargetAddress: string = '';

  addressInput: string = '';

  constructor(private api: ApiServiceService) {
    api.getTargetLocations().subscribe(res => {
      res.forEach(item => {
        this.markers.push(new MarkerAttribute(
          item.name,
          `${item.address}, ${item.city} ${item.state} ${item.zip}`,
          {lat: item.lat, lng: item.lon }
        ));
      });
    });
  }

  openInfoWindow(markerSpot: MapMarker, marker: MarkerAttribute) {
    this.selectedMarker = marker;
    this.infoWindow.open(markerSpot);
  }

  getNearestTarget() {
    this.api.getNearestTarget(this.addressInput).subscribe(res => {
      this.setNearestTargetValues(res);
    });
  }

  setNearestTargetValues(target: ClosestTargetResponse) {
    this.routeTo = google.maps.geometry.encoding.decodePath(target.directions.encodedPolyline);
    this.distanceToTarget = target.directions.drivingDistance;
    this.durationToTarget = target.directions.drivingDuration;
    this.closestTargetAddress = target.closestTarget.formattedAddress;
    this.center = { lat: target.directions.centerLat, lng: target.directions.centerLon };
    this.zoom = 11;
    this.infoWindow.position = { lat: target.closestTarget.latitude, lng: target.closestTarget.longitude };
    this.infoWindow.open();
  }
}

class MarkerAttribute {
  title: string;
  label: string;
  position: google.maps.LatLngLiteral;

  constructor(title?: string, label?: string, position?: google.maps.LatLngLiteral) {
    this.title = title || '';
    this.label = label || '';
    this.position = position || { lat: 0, lng: 0 };
  }
}

