export class TargetResponse {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    lat: number;
    lon: number;
    constructor(name: string, address: string, city: string, state: string, zip: string, lat: number, lon: number) {
        this.name = name;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.lat = lat;
        this.lon = lon;
    }
}