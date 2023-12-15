using TargetedHomes.Models;

namespace TargetedHomes.Business
{
    public class TargetBusiness
    {
        private readonly IConfiguration _config;
        public TargetBusiness(IConfiguration config)
        {
            _config = config;
        }

        public IEnumerable<poi_locs> GetTargets(string state)
        {
            List<poi_locs> retVal;
            using (var db = new TargetHomeContext(_config))
            {
                retVal = db.poi_locs.Where(x => x.state == state).ToList();
            }
            return retVal;
        }
    }
}
