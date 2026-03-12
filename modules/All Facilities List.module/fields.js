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
    { expanded: false },
    fi.richtext("Section Label", "section_label", {
      default: "<h2>all <br/>facilities</h2>",
    }),
    fi.richtext("Section Subtitle", "section_subtitle", {
      default:
        "<p>Facilities for all.</p>",
    }),
  ),
  group(
    "Facilities",
    "facilities",
    { expanded: false },
    group(
    "Facilities Items",
    "facilities_items",
     {
        expanded: true,
        occurrence: {
          default: 4,
        },
      },
    fi.richtext("Title", "title", {
      default:
        "<h4>Customized Program</h4>",
    }),
    fi.image("Background Image", "background_image", {
      default: {
        src: "https://242549800.fs1.hubspotusercontent-na2.net/hubfs/242549800/a21301d45219853d1c8c595508f7312a7f3830cf.jpg",
        alt: "Fitness Programs",
      },
      
    }),
     [buttonField({ parentPath: "facilities.facilities_items" })],
  ),
  
  ),
  
  

  ...sectionSettings(
    [
    ],
    [
      fi.choice("Layout Type", "layout_type", {
        choices: [
          ["reverse", "Column Reverse"],
          ["column", "Column"],
        ],
      }),
    ],
  ),
);
