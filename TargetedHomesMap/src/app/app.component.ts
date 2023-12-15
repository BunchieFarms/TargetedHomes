import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainMapComponent } from "./components/main-map/main-map.component";

@Component({
    selector: 'app-root',
    standalone: true,
    template: `<app-main-map />`,
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, MainMapComponent]
})
export class AppComponent {
  
}
