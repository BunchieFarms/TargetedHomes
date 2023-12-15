export class ClosestTargetResponse {
    closestTarget: ClosestTarget;
    directions: ClosestTargetDirections;
    startingPoint: StartingPoint;
}

class ClosestTarget {
    targetName: string;
    formattedAddress: string;
    latitude: number;
    longitude: number;
}

class ClosestTargetDirections {
    encodedPolyline: string;
    drivingDistance: string;
    drivingDuration: string;
    centerLat: number;
    centerLon: number;
}

class StartingPoint {
    formattedAddress: string;
}