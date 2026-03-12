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
      default: "<h2>More Than Just a Gym</h2>",
    }),
    fi.richtext("Section Description", "section_description", {
      default:
        "<p>Experience personalized coaching tailored specifically to your unique goals, schedule, and lifestyle. Whether you prefer training in-person or online, I’ll be there to support and guide you through every step of your journey, ensuring you achieve the results you desire.</p>",
    }),
  ),
  group("Button", "button", { expanded: true }, [
    buttonField({ parentPath: "button" }),
  ]),

  group(
    "Media Section",
    "media_section",
    { expanded: true },

    fi.image("Primary Feature Image", "primary_image", {
      default: {
        src: "../../Images/60bc756c9fc063821f098d170afbeebfeaf58ccf.jpg",
        alt: "Fitness Programs",
      },
    }),
    fi.image("Secondary Feature Image", "secondary_image", {
      default: {
        src: "../../Images/f635f1166ce148c83a490e5d683a952329e04888.jpg",
        alt: "Fitness Programs",
      },
    }),
  ),

  group(
    "Counter Stats",
    "counter_stats",
    {
      expanded: true,
    },
    group(
      " Counter Items",
      "counter_items",
      {
        expanded: true,
        occurrence: {
          default: 4,
          sorting_label_field: "icon_type",
        },
      },
      fi.richtext("Feature Title", "feature_title", {
        default: "<h3>500+</h3>",
      }),
      fi.richtext("Feature Description", "feature_description", {
        default: "<p>Client Satisfaction</p>",
      }),
    ),
  ),

  ...sectionSettings([], [fi.boolean("Column Reverse", "column_reverse")]),
);
