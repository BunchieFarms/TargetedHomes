﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace TargetedHomes.Models;

public partial class poi_groups
{
    public int group_id { get; set; }

    public string name { get; set; }

    public virtual ICollection<poi_locs> poi_locs { get; set; } = new List<poi_locs>();
}