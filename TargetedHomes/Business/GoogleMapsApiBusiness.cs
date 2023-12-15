using GoogleApi;
using GoogleApi.Entities.Maps.Common;
using GoogleApi.Entities.Maps.Geocoding;
using GoogleApi.Entities.Maps.Geocoding.Address.Request;
using GoogleApi.Entities.Maps.Routes.Common;
using GoogleApi.Entities.Maps.Routes.Common.Enums;
using GoogleApi.Entities.Maps.Routes.Directions.Request;
using GoogleApi.Entities.Maps.Routes.Directions.Response;
using GoogleApi.Entities.Maps.Routes.Matrix.Request;
using GoogleApi.Entities.Maps.Routes.Matrix.Response;
using TargetedHomes.Models;

namespace TargetedHomes.Business
{
    public class GoogleMapsApiBusiness
    {
        private readonly IConfiguration _config;
        private readonly GoogleMaps.Geocode.AddressGeocodeApi _geocodeApi;
        private readonly GoogleMaps.Routes.RoutesMatrixApi _matrixApi;
        private readonly GoogleMaps.Routes.RoutesDirectionsApi _directionsApi;
        private TargetBusiness _targetBusiness;
        public GoogleMapsApiBusiness(IConfiguration config,
                                    GoogleMaps.Geocode.AddressGeocodeApi geocodeApi,
                                    TargetBusiness targetBusiness,
                                    GoogleMaps.Routes.RoutesMatrixApi matrixApi,
                                    GoogleMaps.Routes.RoutesDirectionsApi directionsApi)
        {
            _config = config;
            _geocodeApi = geocodeApi;
            _targetBusiness = targetBusiness;
            _matrixApi = matrixApi;
            _directionsApi = directionsApi; 
        }

        public async Task<GoogleApi.Entities.Maps.Geocoding.Common.Result?> GeocodeAddress(string address)
        {
            AddressGeocodeRequest geo = new AddressGeocodeRequest();
            geo.Key = _config["GoogleMapsAPIKey"];
            geo.Address = address;
            GeocodeResponse res = await _geocodeApi.QueryAsync(geo);
            return res.Results.Any() ? res.Results.First() : null;
        }

        public async Task<ClosestTargetResponse> GetClosestTarget(string address)
        {
            var geoAddr = await GeocodeAddress(address);
            var targets = _targetBusiness.GetTargets("NC");
            var nearbyTargets = Enumerable.Empty<poi_locs>();
            double inching = 1;
            while (!nearbyTargets.Any() || inching == 5)
            {
                inching += 0.5;
                nearbyTargets = targets.Where(t => Math.Abs(t.lat - geoAddr.Geometry.Location.Latitude) < inching && Math.Abs(t.lon - geoAddr.Geometry.Location.Longitude) < inching);
            }
            var origins = new List<RouteMatrixOrigin>
            {
                new()
                {
                    Waypoint = new RouteWayPoint
                    {
                        Location = new RouteLocation { LatLng = new LatLng { Latitude = geoAddr.Geometry.Location.Latitude, Longitude = geoAddr.Geometry.Location.Longitude } }
                    }
                }
            };
            var destinations = new List<RouteMatrixDestination>();
            foreach (poi_locs target in nearbyTargets)
            {
                destinations.Add(new RouteMatrixDestination
                {
                    Waypoint = new RouteWayPoint
                    {
                        Location = new RouteLocation { LatLng = new LatLng { Latitude = target.lat, Longitude = target.lon } }
                    }
                });
            }
            var matrixRequest = new RoutesMatrixRequest
            {
                Key = _config["GoogleMapsAPIKey"],
                Origins = origins,
                Destinations = destinations,
                TravelMode = RouteTravelMode.Drive
            };
            RoutesMatrixResponse matrixResponse = await _matrixApi.QueryAsync(matrixRequest);
            MatrixElement closestTargetMatrixEl = matrixResponse.Elements.Aggregate((minItem, nextItem) => minItem.DistanceMeters < nextItem.DistanceMeters ? minItem : nextItem);
            var closestTargetDestinationEl = destinations[closestTargetMatrixEl.DestinationIndex.GetValueOrDefault()].Waypoint.Location.LatLng;

            var directionsRequest = new RoutesDirectionsRequest
            {
                Key = _config["GoogleMapsAPIKey"],
                Origin = new RouteWayPoint
                {
                    Location = new RouteLocation { LatLng = new LatLng { Latitude = geoAddr.Geometry.Location.Latitude, Longitude = geoAddr.Geometry.Location.Longitude } }
                },
                Destination = new RouteWayPoint
                {
                    Location = new RouteLocation { LatLng = new LatLng { Latitude = closestTargetDestinationEl.Latitude, Longitude = closestTargetDestinationEl.Longitude } }
                },
                Units = GoogleApi.Entities.Maps.Common.Enums.Units.Imperial
            };
            RoutesDirectionsResponse directionsResponse = await _directionsApi.QueryAsync(directionsRequest);
            ClosestTargetResponse response = new ClosestTargetResponse(nearbyTargets.ElementAt(closestTargetMatrixEl.DestinationIndex.GetValueOrDefault()),
                                                                        geoAddr,
                                                                        directionsResponse.Routes.ElementAt(0));
            return response;
        }
    }
}
