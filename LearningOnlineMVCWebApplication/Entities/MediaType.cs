using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LearningOnlineMVCWebApplication.Interfaces;

namespace LearningOnlineMVCWebApplication.Entities
{
    public class MediaType : IPrimaryProperties
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200,MinimumLength = 2)]
        public string Title { get; set; }

        [Required] 
        public string ThumbnailImagePath { get; set; }
        
        [ForeignKey("MediaTypeId")]
        public virtual ICollection<CategoryItem> CategoryItems { get; set; }
        
    }
}