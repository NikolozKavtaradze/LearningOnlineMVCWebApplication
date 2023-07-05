using System.Collections;
using System.Collections.Generic;
using System.Linq;
using LearningOnlineMVCWebApplication.Interfaces;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace LearningOnlineMVCWebApplication.Extensions
{
    public static class ConvertExtensions
    {
        public static List<SelectListItem> ConvertToSelectList<T>(this IEnumerable<T> collection, int selectedValue) where T: IPrimaryProperties
        {
            return collection.Select(item => new SelectListItem
            {
                Text = item.Title,
                Value = item.Id.ToString(),
                Selected = item.Id == selectedValue,
            }).ToList();
        }
    }
}