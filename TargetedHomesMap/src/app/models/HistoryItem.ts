export class HistoryItem {
    address: string;
    distance: string;
    duration: string;
  
    constructor(address: string, distance: string, duration: string) {
      this.address = address;
      this.distance = distance;
      this.duration = duration;
    }
  }