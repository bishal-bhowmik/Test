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
    fi.richtext("Section Title", "section_title", {
      default: "<h1>Shape Your </br> tomorrow.</h1>",
    }),
    fi.richtext("Section Subtitle", "section_subtitle", {
      default:
        "<p>Personalized coaching designed around your goals, schedule, and lifestyle. Whether you train in-person or online, I’ll guide you every step of the way.</p>",
    }),
  ),

  group(
    "Media Section",
    "media_section",
    { expanded: false },
    fi.image("Primary Image", "primary_image", {
      default: {
        src: "../../Images/9d09c0be48edd0c2d10805d2e015a68d71125554.jpg",
        alt: "Fitness Programs",
      },
    }),
    fi.image("Secondary Image", "secondary_image", {
      default: {
        src: "../../Images/1a68b874d39d0753c67576727b16680d6709ce17.jpg",
        alt: "Fitness Programs",
      },
    }),
  ),
  group(
    "Offer Card",
    "offer_card",
    { expanded: false },
    fi.boolean("Enable", "enable", {
      default: true,
    }),
    fi.richtext("Card Label", "card_label", {
      default: "<h5>We Offer</h5><p>Free trial sessions fro new members</p>",
    }),
    [buttonField({ parentPath: "offer_card" })],
  ),
  group(
    "Counter Stats",
    "counter_stats",
    { expanded: false },
    fi.boolean("Enable", "enable", {
      default: true,
    }),
    fi.richtext("Counter Number", "counter_number", {
      default: "<h5>50+</h5>",
    }),
    fi.richtext("Counter Title", "counter_title", {
      default: "<p>Personal Trainers</p>",
    }),
  ),
  


  ...sectionSettings(
    [
      
      group(
        "Padding",
        "padding",
        { expanded: true },
        fi.boolean("Enable", "enable", {
          default: false,
        }),
        group(
          "Desktop",
          "desktop",
          {
            expanded: true,
            visibility: {
              controlling_field: "style.padding.enable",
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
          },
          fi.number("Padding Top", "top_padding", { suffix: "px" }),
          fi.number("Padding Bottom", "bottom_padding", { suffix: "px" }),
          fi.number("Padding Left", "left_padding", { suffix: "px" }),
          fi.number("Padding Right", "right_padding", { suffix: "px" }),
        ),
        group(
          "Mobile",
          "mobile",
          {
            expanded: true,
            visibility: {
              controlling_field: "style.padding.enable",
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
            suffix: "px",
          },
          fi.number("Padding Top", "top_padding", { suffix: "px" }),
          fi.number("Padding Bottom", "bottom_padding", { suffix: "px" }),
          fi.number("Padding Left", "left_padding", { suffix: "px" }),
          fi.number("Padding Right", "right_padding", { suffix: "px" }),
        ),
      ),
    ],
    
  ),
);
