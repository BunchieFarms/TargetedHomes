import { Component, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ApiServiceService } from '../../services/api-service.service';
import { FormsModule } from '@angular/forms';
import { ClosestTargetResponse } from '../../models/ClosestTargetResponse';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MapSidebarComponent } from '../map-sidebar/map-sidebar.component';
import { ResultsCardComponent } from '../results-card/results-card.component';
import { HistoryItem } from '../../models/HistoryItem';

@Component({
  selector: 'app-main-map',
  standalone: true,
  templateUrl: './main-map.component.html',
  styleUrl: './main-map.component.scss',
  imports: [GoogleMapsModule, FormsModule, InputGroupModule, InputTextModule, ButtonModule, MapSidebarComponent, ResultsCardComponent]
})
export class MainMapComponent {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  @ViewChild(GoogleMap) googleMap: GoogleMap;
  @ViewChild(MapSidebarComponent) mapSidebar: MapSidebarComponent;
  @ViewChild(ResultsCardComponent) resultsCard: ResultsCardComponent;

  center: google.maps.LatLngLiteral = { lat: 35.5, lng: -80 };
  zoom = 8;

  markers: MarkerAttribute[] = [];
  selectedMarker: MarkerAttribute = new MarkerAttribute();
  routeTo: google.maps.LatLng[] = [];
  bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds();

  addressInput: string = '';

  constructor(private api: ApiServiceService) {
    api.getTargetLocations().subscribe(res => {
      res.forEach(item => {
        var marker = new MarkerAttribute(
          item.name,
          `${item.address}, ${item.city} ${item.state} ${item.zip}`,
          { lat: item.lat, lng: item.lon }
        );
        this.markers.push(marker);
        this.bounds.extend(marker.position)
      });
    this.googleMap.fitBounds(this.bounds);
    });
  }

  openInfoWindow(markerSpot: MapMarker, marker: MarkerAttribute) {
    this.selectedMarker = marker;
    this.infoWindow.open(markerSpot);
  }

  openSidebar() {
    this.mapSidebar.openSidebar();
  }

  getNearestTarget(address?: string) {
    this.api.getNearestTarget(address || this.addressInput).subscribe(res => {
      this.setNearestTargetValues(res);
    });
  }

  getNearestTargetFromHistory(address: string) {
    this.addressInput = address;
    this.getNearestTarget(address);
  }

  clearAll() {
    this.addressInput = '';
  }

  setNearestTargetValues(target: ClosestTargetResponse) {
    this.routeTo = google.maps.geometry.encoding.decodePath(target.directions.encodedPolyline);
    this.center = { lat: target.directions.centerLat, lng: target.directions.centerLon };
    this.zoom = 9;
    this.resultsCard.updateCard(target);
    this.addLocationToHistory(target);
  }

  addLocationToHistory(target: ClosestTargetResponse) {
    if (!localStorage.getItem('history'))
      localStorage.setItem('history', '[]');
    let currentHistory = localStorage.getItem('history');
    let parsedHistory: HistoryItem[] = JSON.parse(currentHistory!);
    console.log(parsedHistory)
    console.log(target.closestTarget.formattedAddress)
    if (!parsedHistory.find(x => x.address == target.origin.formattedAddress)) {
      if (parsedHistory.length > 9)
        parsedHistory.pop();
      parsedHistory.push(new HistoryItem(target.origin.formattedAddress, target.directions.drivingDistance, target.directions.drivingDuration));
      localStorage.setItem('history', JSON.stringify(parsedHistory));
    }
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

