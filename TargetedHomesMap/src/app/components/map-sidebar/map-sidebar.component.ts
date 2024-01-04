import { Component, EventEmitter, Output } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { HistoryItem } from '../../models/HistoryItem';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-map-sidebar',
  standalone: true,
  imports: [CommonModule, SidebarModule, CardModule, ButtonModule],
  templateUrl: './map-sidebar.component.html',
  styleUrl: './map-sidebar.component.scss'
})
export class MapSidebarComponent {
  @Output() routeToAddress = new EventEmitter<string>();

  sidebarVisible = false;
  profilePresent = false;
  username: string | null = '';
  localHistory: HistoryItem[] = [];
  selectedAddress = '';

  openSidebar() {
    this.sidebarVisible = true;
    this.getHistory();
  }

  getHistory() {
    if (localStorage.getItem('history'))
      this.localHistory = JSON.parse(localStorage.getItem('history')!);
  }

  routeToHistory(address: string) {
    this.routeToAddress.emit(address);
    this.sidebarVisible = false;
    this.selectedAddress = '';
  }

  clearHistory() {
    localStorage.removeItem('history');
    this.localHistory = [];
    this.sidebarVisible = false;
  }
}
