﻿using A4KPI.Models.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
namespace A4KPI.Models
{
    [Table("SettingMonthly")]
    public class SettingMonthly : IDateTracking
    {
        [Key]
        public int Id { get; set; }
        public DateTime DisplayTime { get; set; }
        public int CreatedBy { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime? ModifiedTime { get; set; }


    }
}