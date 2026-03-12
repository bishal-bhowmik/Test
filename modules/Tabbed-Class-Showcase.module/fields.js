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
      default: "<h2>Our Classes</h2>",
    }),
  ),
  group(
    "Class Items",
    "class_items",
    { expanded: true },
    group(
      "Class Item",
      "class_item",
      {
        expanded: true,
        occurrence: {
          default: 4,
        },
      },
      fi.choice("Icon Type", "icon_type", {
        choices: [
          ["hubspot_icon", "Hubspot Icon"],
          ["custom_svg", "Custom SVG"],
          ["image", "Image Icon"],
        ],
        default: "image",
        help_text: "The image icon will not contain the global color",
      }),
      fi.icon("Hubspot Icon", "hubspot_icon", {
        default: {
          name: "star",
          type: "SOLID",
          unicode: "f005",
        },
        visibility: {
          controlling_field: "class_items.class_item.icon_type",
          operator: "EQUAL",
          controlling_value_regex: "hubspot_icon",
        },
      }),
      fi.text("Custom SVG", "custom_svg", {
        default:
          '<svg class="icon" aria-hidden="true" viewBox="0 0 512 512"> <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z" /> </svg>',
        placeholder: "Enter SVG Code",
        visibility: {
          controlling_field: "class_items.class_item.icon_type",
          operator: "EQUAL",
          controlling_value_regex: "custom_svg",
        },
      }),
      fi.image("Image Icon", "image_icon", {
        default: {
          src: "../../Images/Arrow.svg",
          alt: "Image Icon",
        },
        visibility: {
          controlling_field: "class_items.class_item.icon_type",
          operator: "EQUAL",
          controlling_value_regex: "image",
        },
      }),
      fi.richtext("Class Title", "class_title", {
        default: "<h5>Strength Training</h5>",
      }),
      group(
        "Class Details",
        "class_details",
        {
          expanded: true,
          occurrence: {
            default: 4,
          },
        },
        fi.richtext("Class Information", "class_title", {
          default: "<p>Progressive overload based workouts</p>",
        }),
        fi.choice("Icon Type", "icon_type", {
          choices: [
            ["hubspot_icon", "Hubspot Icon"],
            ["custom_svg", "Custom SVG"],
            ["image", "Image Icon"],
          ],
          default: "hubspot_icon",
          help_text: "The image icon will not contain the global color",
        }),
        fi.icon("Hubspot Icon", "hubspot_icon", {
          default: {
            name: "star",
            type: "SOLID",
            unicode: "f005",
          },
          visibility: {
            controlling_field: "class_items.class_item.class_details.icon_type",
            operator: "EQUAL",
            controlling_value_regex: "hubspot_icon",
          },
        }),
        fi.text("Custom SVG", "custom_svg", {
          default:
            '<svg class="icon" aria-hidden="true" viewBox="0 0 512 512"> <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z" /> </svg>',
          placeholder: "Enter SVG Code",
          visibility: {
            controlling_field: "class_items.class_item.class_details.icon_type",
            operator: "EQUAL",
            controlling_value_regex: "custom_svg",
          },
        }),
        fi.image("Image Icon", "image_icon", {
          default: {
            src: "https://242549800.fs1.hubspotusercontent-na2.net/hubfs/242549800/012-yoga-position.svg",
            alt: "Image Icon",
          },
          visibility: {
            controlling_field: "class_items.class_item.class_details.icon_type",
            operator: "EQUAL",
            controlling_value_regex: "image",
          },
        }),
      ),
      fi.richtext("Age Range", "age", {
        default: "Age Range: 16–55",
      }),

      fi.richtext("Session Duration", "session", {
        default: "Session Duration: 60 minutes",
      }),
      
      fi.richtext("Pricing", "pricing", {
        default: "<p>Starting at</p><h6>$39/session</h6>",
      }),
      group("Button", "button", { expanded: true }, [
        buttonField({ parentPath: "class_items.class_item.button" }),
      ]),
      group(
        "Gallery Section",
        "gallery_section",
        {
          expanded: true,
          occurrence: {
            default: 3,
            max: 3,
          },
        },

        fi.image("Image", "image", {
          default: {
            src: "../../Images/4f865b9ada9333d5a9aa47f9e436644a0456b2dc.jpg",
            alt: "Image FitMax",
          },
        }),
      ),
    ),
  ),

  

  ...sectionSettings(),
);
