import {
  group,
  styleGroup,
  init,
  moduleFields as fi,
} from "@resultify/hubspot-fields-js";
import { sectionSettings } from "../../partials/sectionSettings.js";

init(
  group(
    "Content",
    "content",
    { expanded: false },
    
    fi.richtext("Rich Text", "section_title", {
      default: "<h1>schedule a meeting</h1><p>Discover the benefits of our gym and amenities with a personal session led by our fitness experts.</p></br><p>Choose a convenient time, and let us help you on your journey.</p>",
    }),
   
  ),
  
  group(
    "Meeting Link",
    "meeting_link",
    { expanded: false },
    
    fi.meeting("Select Meeting Link","meeting"),
   
  ),

  ...sectionSettings([ 
]
  ,[
  ]),
);
