export class ClosestTargetResponse {
    closestTarget: ClosestTarget;
    directions: ClosestTargetDirections;
    origin: Origin;
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

class Origin {
    formattedAddress: string;
}