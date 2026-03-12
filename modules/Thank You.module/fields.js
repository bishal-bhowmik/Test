import {
  group,
  styleGroup,
  init,
  moduleFields as fi,
} from "@resultify/hubspot-fields-js";
import { sectionSettings } from "../../partials/sectionSettings.js";

import { buttonField } from "../../partials/button.js";
init(
  group(
    "Content",
    "content",
    { expanded: false },
    
    fi.richtext("Rich Text", "section_title", {
      default: "<h1>Thank you</h1><h5>Your order is confirmed.</h5><p>We’ve emailed your order details. If you don’t see it, check your spam—sometimes we lift too heavy and break the inbox rules.</p>",
    }),
   
  ),
  
  group(
    "Media Section",
    "media_section",
    { expanded: false },
    fi.image("Background Image", "background_image", {
      default: {
        src: "../../Images/5bb01444601257cfdb4fc821b6b68825fafc24db.png",
        alt: "Fitness Programs",
      },
      
    }),
 
  ),
   group(
    "Button",
    "button",
    { expanded: false },
    [buttonField({ parentPath: "button" })],
      
   ),
  
  ...sectionSettings([ 
]
  ,[
  ]),
);
