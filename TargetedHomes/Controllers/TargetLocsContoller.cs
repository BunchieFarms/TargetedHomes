using Microsoft.AspNetCore.Mvc;
using TargetedHomes.Business;
using TargetedHomes.Models;

namespace TargetedHomes.Controllers
{
    [ApiController]
    public class TargetLocsContoller : ControllerBase
    {
        private TargetBusiness _targetBusiness;
        public TargetLocsContoller(TargetBusiness targetBusiness)
        {
            _targetBusiness = targetBusiness;
        }

        [HttpGet("/api/locs")]
        public IEnumerable<poi_locs> GetTargets()
        {
            return _targetBusiness.GetTargets("NC");
        }
    }
}
