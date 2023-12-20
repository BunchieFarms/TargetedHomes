using GoogleApi;
using Microsoft.AspNetCore.Mvc;
using TargetedHomes.Business;
using TargetedHomes.Models;

namespace TargetedHomes.Controllers
{
    [ApiController]
    public class GoogleMapsApiContoller : ControllerBase
    {
        private GoogleMapsApiBusiness _googleMapsBusiness;
        public GoogleMapsApiContoller(GoogleMapsApiBusiness googleMapsBusiness)
        {
            _googleMapsBusiness = googleMapsBusiness;
        }

        [HttpPost("/api/geocode")]
        public async Task<GoogleApi.Entities.Maps.Geocoding.Common.Result?> GeocodeAddress(GeocodeRequest req)
        {
            return await _googleMapsBusiness.GeocodeAddress(req.address);
        }

        [HttpPost("/api/closestTarget")]
        public async Task<ClosestTargetResponse> GetClosestTarget(GeocodeRequest req)
        {
            return await _googleMapsBusiness.GetClosestTarget(req.address);
        }
    }

    public class GeocodeRequest
    {
        public string address { get; set; }
    }
}
