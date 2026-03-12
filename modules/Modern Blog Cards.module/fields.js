import {
  group,
  styleGroup,
  init,
  moduleFields as fi,
} from "@resultify/hubspot-fields-js";
import { buttonField } from "../../partials/button.js";
import { sectionSettings } from "../../partials/sectionSettings.js";

init(
  group(
    "Content",
    "content",
    { expanded: true },
    
    fi.richtext("Rich Text", "section_title", {
      default: "<h5>BLOG</h5><h2>Related blogs</h2>",
    }),
   
  ),
  group(
    "Blog Type",
    "blog_type",
    { expanded: true },
    
    fi.blog("Select Blog", "select_blog")
   
  ),
  group(
    "Buttons",
    "buttons",
    {
      expanded: true,
    },
    fi.boolean("Enable", "Enable", {default: true,display: "toggle"}),
    [buttonField({ parentPath: "buttons" })],
  ),

  

  ...sectionSettings([
     group(
    "Colors",
    "colors",
    {
      expanded: false,
    },
    fi.color("Category Icon color" , "category_color"),
    fi.gradient("Image Overlay Hover Color" , "gradient_color")
  ),
   group(
    "Font",
    "font",
    {
      expanded: false,
    },
    fi.font("Category" , "category",{
       default: {    
      color: '#101000',
    }
    }),
    fi.font("Date" , "date",{
       default: {    
      color: '#101000',
    }
    }),
    fi.font("Title" , "title",{
       default: {    
      color: '#101000',
    }
    }),
    fi.font("Description" , "description",{
       default: {    
      color: '#4c4c40',
    }
    }),
     fi.font("Button Text" , "button_text",{
       default: {    
      color: '#4c4c40',
    }
     }),
  ),
    
   ] ,[ ]),
);
