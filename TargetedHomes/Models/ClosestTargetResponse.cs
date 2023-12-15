using GoogleApi.Entities.Maps.Directions.Response;
using GoogleApi.Entities.Maps.Routes.Directions.Response;
using GoogleApi.Entities.Maps.Routes.Matrix.Response;

namespace TargetedHomes.Models
{
    public class ClosestTargetResponse
    {
        public ClosestTarget closestTarget { get; set; }
        public ClosestTargetDirections directions { get; set; }
        public StartingPoint origin { get; set; }
        public ClosestTargetResponse(poi_locs target,
                                    GoogleApi.Entities.Maps.Geocoding.Common.Result geocodeResult,
                                    GoogleApi.Entities.Maps.Routes.Directions.Response.Route route)
        {
            closestTarget = new ClosestTarget(target);
            directions = new ClosestTargetDirections(route);
            origin = new StartingPoint(geocodeResult);
        }
    }

    public class ClosestTarget
    {
        public string targetName { get; set; }
        public string formattedAddress { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
        public ClosestTarget(poi_locs target)
        {
            targetName = target.name;
            formattedAddress = $"{target.address}, {target.city} {target.state} {target.zip}";
            latitude = target.lat;
            longitude = target.lon;
        }
    }

    public class ClosestTargetDirections
    {
        public string encodedPolyline { get; set; }
        public string drivingDistance { get; set; }
        public string drivingDuration { get; set; }
        public double centerLat { get; set; }
        public double centerLon { get; set; }
        public ClosestTargetDirections (GoogleApi.Entities.Maps.Routes.Directions.Response.Route route)
        {
            encodedPolyline = route.Polyline.EncodedPolyline;
            drivingDistance = route.LocalizedValues.Distance.Text;
            drivingDuration = route.LocalizedValues.Duration.Text;
            centerLat = (route.Viewport.High.Latitude + route.Viewport.Low.Latitude) / 2;
            centerLon = (route.Viewport.High.Longitude + route.Viewport.Low.Longitude) / 2;
        }
    }

    public class StartingPoint
    {
        public string formattedAddress { get; set; }
        public StartingPoint (GoogleApi.Entities.Maps.Geocoding.Common.Result origin)
        {
            formattedAddress = origin.FormattedAddress.Replace(", USA", "");
        }
    }
}
