using TargetedHomes.Models;

namespace TargetedHomes.Business
{
    public class TargetBusiness
    {
        private readonly TargetHomeContext _context;
        public TargetBusiness(TargetHomeContext context)
        {
            _context = context;
        }

        public IEnumerable<poi_locs> GetTargets(string state)
        {
            return _context.poi_locs.Where(x => x.state == state).ToList();
        }
    }
}
