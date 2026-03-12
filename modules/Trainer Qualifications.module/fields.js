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
    fi.richtext("Section Title", "section_title", {
      default: "<h2>Qualifications & certifications</h2>",
    }),
    
  ),
 group(
    "Qualification Section",
    "qualification_section",
    { expanded: true },
    group(
      "Qualification Item",
      "qualification_item",
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
          controlling_field: "qualification_section.qualification_item.icon_type",
          operator: "EQUAL",
          controlling_value_regex: "hubspot_icon",
        },
      }),
      fi.text("Custom SVG", "custom_svg", {
        default:
          '<svg class="icon" aria-hidden="true" viewBox="0 0 512 512"> <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z" /> </svg>',
        placeholder: "Enter SVG Code",
        visibility: {
          controlling_field: "qualification_section.qualification_item.icon_type",
          operator: "EQUAL",
          controlling_value_regex: "custom_svg",
        },
      }),
      fi.image("Image Icon", "image_icon", {
        default: {
          src: "../../Images/Vector.svg",
          alt: "Image Icon",
        },
        visibility: {
          controlling_field: "qualification_section.qualification_item.icon_type",
          operator: "EQUAL",
          controlling_value_regex: "image",
        },
      }),
      fi.richtext("Qualification", "qualification", {
        default: "<p>Strength Training</p>",
      }),
      

    ),
  ),
 group(
        "Gallery Section",
        "gallery_section",
        {
          expanded: true,
        },
        group(
        "Gallery Item",
        "gallery_item",
        {
          expanded: true,
          occurrence: {
            default: 3,
            max: 3,
          },
        },

        fi.image("Certification Gallery", "certification_gallery", {
          default: {
            src: "../../Images/certificate.png",
            alt: "Image FitMax",
          },
        }),
      ),
        
      ),

  

  ...sectionSettings([], []),
);
