import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ClosestTargetResponse } from '../../models/ClosestTargetResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results-card',
  standalone: true,
  imports: [CardModule, CommonModule],
  templateUrl: './results-card.component.html',
  styleUrl: './results-card.component.scss'
})
export class ResultsCardComponent {
  initTitle = "Enter an address above or select from your history!";
  initBody = "The results of your search will appear here.";
  result: ClosestTargetResponse;

  updateCard(target: ClosestTargetResponse) {
    this.result = target;
  }
}
