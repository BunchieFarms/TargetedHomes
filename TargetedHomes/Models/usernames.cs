﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace TargetedHomes.Models;

public partial class usernames
{
    public int user_id { get; set; }

    public string username { get; set; }

    public virtual ICollection<user_locs> user_locs { get; set; } = new List<user_locs>();
}