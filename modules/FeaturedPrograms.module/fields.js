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
      default:
        "<h2>Featured Workout Programs</h2><p>Pat’s sessions are built around core strength, mindful movement, and proper alignment. Her method focuses on improving stability, balance, and posture — helping you develop a stronger, more centered, and more confident body.</p>",
    }),
  ),
  group(
    " Media Section",
    "media_section",
    { expanded: false },

    fi.boolean("Overlay Enable", "overlay_enable", {
      default: false,
      display: "toggle",
    }),

    fi.richtext("Overlay Text", "overlay_text", {
      default: "<h4>Pat Thompson</h4>",
      visibility: {
        controlling_field: "media_section.overlay_enable",
        operator: "EQUAL",
        controlling_value_regex: "true",
      },
    }),
    group(
      "Social Icons",
      "social_icon",
      {
        expanded: true,
        occurrence: {
          default: 2,
          sorting_label_field: "icon_type",
        },
        visibility: {
          controlling_field: "media_section.overlay_enable",
          operator: "EQUAL",
          controlling_value_regex: "true",
        },
      },

      fi.choice("Icon Type", "icon_type", {
        choices: [
          ["hubspot_icon", "Hubspot Icon"],
          ["custom_svg", "Custom SVG"],
          ["image", "Image Icon"],
        ],
        default: "custom_svg",
      }),
      fi.color("Icon Background Color", "icon_background"),
      fi.icon("Hubspot Icon", "hubspot_icon", {
        default: {
          name: "instagram",
          type: "SOLID",
          unicode: "f16d",
        },
        visibility: {
          controlling_field: "media_section.social_icon.icon_type",
          operator: "EQUAL",
          controlling_value_regex: "hubspot_icon",
        },
      }),
      fi.text("Custom SVG", "custom_svg", {
        default:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M80 299.3l0 212.7 116 0 0-212.7 86.5 0 18-97.8-104.5 0 0-34.6c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4 .4 37 1.2l0-88.7C291.4 4 256.4 0 236.2 0 129.3 0 80 50.5 80 159.4l0 42.1-66 0 0 97.8 66 0z"/></svg>',
        placeholder: "Enter SVG Code",
        visibility: {
          controlling_field: "media_section.social_icon.icon_type",
          operator: "EQUAL",
          controlling_value_regex: "custom_svg",
        },
      }),
      fi.image("Image Icon", "image_icon", {
        default: {
          src: "https://242549800.fs1.hubspotusercontent-na2.net/hubfs/242549800/icon.png",
          alt: "Image Icon",
        },
        visibility: {
          controlling_field: "media_section.social_icon.icon_type",
          operator: "EQUAL",
          controlling_value_regex: "image",
        },
      }),
      fi.link("Link", "link"),
    ),

    fi.image("Section Image", "background_image", {
      default: {
        src: "https://242549800.fs1.hubspotusercontent-na2.net/hubfs/242549800/a21301d45219853d1c8c595508f7312a7f3830cf.jpg",
        alt: "Fitness Programs",
      },
    }),
  ),
  group(
    "Features",
    "features",
    {
      expanded: false,
      occurrence: {
        default: 4,
        sorting_label_field: "icon_type",
      },
    },
    
    fi.richtext("Feature Details", "feature_details", {
      default:
        "<h5>Featured Workout Programs</h5><p>Pat’s sessions are built around core strength, mindful movement, and proper alignment. Her method focuses on improving stability, balance, and posture — helping you develop a stronger, more centered, and more confident body.</p>",
    }),
[buttonField({ parentPath: "features" })],
    group(
      " Feature Icon",
      "icon",
      {
        expanded: true,
      },
      fi.color("Icon Background Color", "icon_background"),
      fi.choice("Icon Type", "icon_type", {
        choices: [
          ["hubspot_icon", "Hubspot Icon"],
          ["custom_svg", "Custom SVG"],
          ["image", "Image Icon"],
        ],
        default: "custom_svg",
      }),
      fi.icon("Hubspot Icon", "hubspot_icon", {
        default: {
          name: "star",
          type: "SOLID",
          unicode: "f005",
        },
        visibility: {
          controlling_field: "features.icon.icon_type",
          operator: "EQUAL",
          controlling_value_regex: "hubspot_icon",
        },
      }),
      fi.text("Custom SVG", "custom_svg", {
        default:
          '<svg class="icon" aria-hidden="true" viewBox="0 0 512 512"> <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z" /> </svg>',
        placeholder: "Enter SVG Code",
        visibility: {
          controlling_field: "features.icon.icon_type",
          operator: "EQUAL",
          controlling_value_regex: "custom_svg",
        },
      }),
      fi.image("Image Icon", "image_icon", {
        default: {
          src: "https://242549800.fs1.hubspotusercontent-na2.net/hubfs/242549800/icon.png",
          alt: "Image Icon",
        },
        visibility: {
          controlling_field: "features.icon.icon_type",
          operator: "EQUAL",
          controlling_value_regex: "image",
        },
      }),
    ),
  ),

  

  ...sectionSettings(
    [],
    [
      fi.choice("Layout Type", "layout_type", {
        choices: [
          ["left", "Show Heading Left"],
          ["right", "Show Heading Right"],
        ],
        default: "right",
      }),
    ],
  ),
);
