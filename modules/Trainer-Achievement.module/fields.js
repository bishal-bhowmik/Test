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
    fi.richtext("Section Title", "section_title", {
      default: "<h1>ACHIEVEMENTS</h1>",
      help_text: "The main heading for the achievements section"
    }),
  ),
  group(
    "Counter Stats",
    "counter_stats",
    {
      expanded: true,
    },
    group(
      "Counter Items",
      "counter_items",
      {
        occurrence: {
          min: 1,
          max: 4,
          default: 4,
          sorting_label_field: "counter_stats.counter_items.stat_number", 
        },
      },
      fi.richtext("Stat Number", "stat_number", {
        default: "<h3>10+</h3>",
        help_text: "The large number or metric (e.g., 10+, 1k+)"
      }),
      fi.richtext("Stat Label", "stat_label", {
        default: "<p>certifications &qulifications</p>",
        help_text: "The description text below the number"
      }),
    ),
  ),
  ...sectionSettings([]),
);