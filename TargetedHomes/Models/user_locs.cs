﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace TargetedHomes.Models;

public partial class user_locs
{
    public int user_loc_id { get; set; }

    public int? user_id { get; set; }

    public string name { get; set; }

    public string address { get; set; }

    public string city { get; set; }

    public string state { get; set; }

    public string zip { get; set; }

    public float lat { get; set; }

    public float lon { get; set; }

    public string loc_link { get; set; }

    public string loc_notes { get; set; }

    public bool favorite { get; set; }

    public virtual usernames user { get; set; }
}