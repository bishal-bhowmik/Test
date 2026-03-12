import {
  group,
  init,
  moduleFields as fi,
} from "@resultify/hubspot-fields-js";
import { buttonField } from "../../partials/button.js";
import { sectionSettings } from "../../partials/sectionSettings.js";

init(

  fi.boolean("Similar Posts / Navigation Menu", "similar_or_navigation", {
    display: "toggle",
    default: false,
  }),

 
  fi.richtext("Title", "title", {
    default: "<h5>Relevant Contents</h5>",
  }),

  fi.boolean("Automatically Generate Anchors", "automatically_generate_anchors", {
  display: "toggle",
  default: false,
  // Using helpText is more reliable for toggles than inlineHelpText
  help_text: "When enabled, the module will automatically generate parent anchors for all H2, H5 titles and add the following H6 titles as children of the last H5 title.",
  visibility: {
    controlling_field: "similar_or_navigation",
    operator: "EQUAL",
    controlling_value_regex: "true",
  },
}),

 
  group(
    "Anchors", // Label
    "anchors_group", // Name
    {
      visibility: {
        controlling_field: "automatically_generate_anchors",
        controlling_value_regex: "false",
        operator: "EQUAL",
      },
    },
  
    group("Anchors", "anchors", {
      occurrence: { min: 0 },
      visibility: {
        controlling_field: "similar_or_navigation",
        controlling_value_regex: "true",
        operator: "EQUAL",
      },
    },
      fi.text("Anchor Text", "anchor_text"),
      fi.text("Anchor Link", "anchor_link", {
        default: "#",
        inlineHelpText: 'To link to a section on your page, the anchor must begin with a "#" character.',
      }),
      // Child Anchors Repeater
      group("Child Anchors", "child_anchors", {
        occurrence: { min: 0 },
      },
        fi.text("Anchor Text", "anchor_text"),
        fi.text("Anchor Link", "anchor_link", {
          default: "#",
          inlineHelpText: 'To link to a section on your page, the anchor must begin with a "#" character.',
        })
      )
    )
  ),


  // ...sectionSettings([], [])
);