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
    { expanded: true },
    
    fi.richtext("Rich Text", "section_title", {
      default: "<h2>Real Results, Real Impact</h2>",
    }),
   
  ),
  group(
    "Frequently Asked Questions",
    "faq",
    { expanded: true },
   
    group(
      "Questions ",
      "questions",
      {
        expanded: true,
        
      },
      group(
        "Question Item",
        "question_items",
        {
          expanded: true,
          occurrence: {
            default: 4,
            sorting_label_field: "icon_type",
          },
        },
        fi.richtext("Question Text", "question_text", {
          default: "<p>How often should I train per week?</p>",
        }),
        fi.richtext("Question Description", "question_description", {
          default:
            "<p>Most clients see great results with 3–5 sessions weekly, depending on their goals, fitness level, and recovery needs.</p>",
        }),
 
      ),
    ),
    
  ),

  

  ...sectionSettings([]
  ,[fi.number("Content Max width", "content",{
    default:"1000",
    suffix:"px",
  }),
   
  ]),
);
