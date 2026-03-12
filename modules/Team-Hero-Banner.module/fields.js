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
    fi.richtext("Section Label", "section_label", {
      default: "<h3>TRAINERS</h3><h1>strength meets</h1>",
    }),
  ),
  group(
    "Trainers Section",
    "trainers_section",
    { expanded: true },
    fi.richtext("Trainer Title", "trainer_title", {
      default: "<h6>Experienced Trainers</h6>",
    }),
    fi.richtext("Trainer Count Prefix", "trainer_count", {
      default: "<h6>9+</h6>",
    }),
    group(
      "Trainer Avatars",
      "trainers_avartar",
      { expanded: true },
      group(
        "Trainer Avatar Item",
        "avartar_item",
        {
          expanded: true,
          occurrence: {
            default: 5,
            max: 5,
            sorting_label_field: "icon_type",
          },
        },
        fi.image("Trainer Image", "trainer_image", {
          default: {
            src: "https://242549800.fs1.hubspotusercontent-na2.net/hubfs/242549800/a21301d45219853d1c8c595508f7312a7f3830cf.jpg",
            alt: "Fitness Programs",
          },
        }),
      ),
    ),
  ),

  group(
    "Media Section",
    "media_section",
    { expanded: true },

    fi.image("Top Feature Image", "feature_image", {
      default: {
        src: "https://242549800.fs1.hubspotusercontent-na2.net/hubfs/242549800/a21301d45219853d1c8c595508f7312a7f3830cf.jpg",
        alt: "Fitness Programs",
      },
    }),
    fi.image("Bottom Left Image", "left_image", {
      default: {
        src: "../../Images/792c8d0ca75d06f054e6dcacebabaf19a5ffb2aa.jpg",
        alt: "Fitness Programs",
      },
    }),
    fi.image("Bottom Right Image", "right_image", {
      default: {
        src: "../../Images/53c67e596175453fd60d46c8dd105f22da4d7963.png",
        alt: "Fitness Programs",
      },
    }),
  ),
  group(
    "Overlay Badge",
    "overlay_badge",
    { expanded: true },
    fi.richtext("Badge Value", "badge_value", {
      default: "<h3>12+</h3>",
    }),
    fi.richtext("Badge Label", "badge_label", {
      default: "<p>years of experience</p>",
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
