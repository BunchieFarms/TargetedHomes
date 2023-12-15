import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClosestTargetResponse } from '../models/ClosestTargetResponse';
import { TargetResponse } from '../models/TargetResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) {}

  getTargetLocations() {
    return this.http.get<TargetResponse[]>("http://localhost:5120/locs");
  }

  getNearestTarget(_address: string) {
    return this.http.post<ClosestTargetResponse>("http://localhost:5120/closestTarget", {address: _address});
  }
}
