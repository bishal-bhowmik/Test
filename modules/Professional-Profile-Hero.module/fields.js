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
      default:
        "<h3>FITNESS EXPERT</h3><h1>CLIENTS TESTIMONIALS</h1><p>Helping people build strength, confidence, and discipline through personalized fitness programs designed to fit any lifestyle.</p>",
    }),
  ),
  group("Media Section", "testimonial_items", { expanded: false }, [
    fi.choice("Featured Media", "video_source_type", {
      choices: [
        ["video_file", "Video File"],
        ["embed", "Embed"],
        ["image", "Image"],
      ],
      default: "video_file",
      display: "select",
    }),
    

    fi.choice("Aspect Ratio", "video_aspect_ratio", {
      choices: [
        ["vertical", "Vertical (51:61)"],
        ["landscape", "Landscape (16:9)"],
        ["square", "Square (1:1)"],
         ["custom", "Custom"],
      ],
      default: "vertical",
      display: "select",
    }),
    fi.number("Width", "custom_ratio_width", {
      default: " 42",
    visibility: {
        controlling_field: "testimonial_items.video_aspect_ratio",
        operator: "EQUAL",
        controlling_value_regex: "custom",
      },
    }),
    fi.number("Height", "custom_ratio_height", {
      default: " 30",
       visibility: {
        controlling_field: "testimonial_items.video_aspect_ratio",
        operator: "EQUAL",
        controlling_value_regex: "custom",
      },
    }),

    fi.image("Image File", "image", {
      default: {
        src: "../../Images/60bc756c9fc063821f098d170afbeebfeaf58ccf.jpg",
        alt: "Fitness Programs",
      },
      visibility: {
        controlling_field: "testimonial_items.video_source_type",
        operator: "EQUAL",
        controlling_value_regex: "image",
      },
    }),

    // Conditional Field: Embed URL (OEmbed)
    fi.embed("Embed", "embed_field", {
      supported_source_types: ["oembed"],
      supported_oembed_types: ["photo", "video", "link", "rich"],
      resizable: true,
      show_preview: true,
      default: {
        source_type: "oembed",
        oembed_url: "https://youtu.be/Sc7LUjbKBHw?si=JNFwQBcFdhqx8D6P",
        oembed_response: {
          type: "video",
          version: "1.0",
          html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/Sc7LUjbKBHw?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen title="a Cinematic Fitness Video...SONY FX6"></iframe>',
          title: "a Cinematic Fitness Video...SONY FX6",
          author_name: "Liam Fox Films",
          author_url: "https://www.youtube.com/@liamfoxfilms",
          provider_name: "YouTube",
          provider_url: "https://www.youtube.com/",
          thumbnail_url: "https://i.ytimg.com/vi/Sc7LUjbKBHw/hqdefault.jpg",
          thumbnail_width: "480",
          thumbnail_height: "360",
          height: "113",
          width: "200",
        },
        width: 200,
        height: 113,
        size_type: "auto",
        max_width: 200,
        max_height: 113,
        embed_html:
          '<iframe width="560" height="315" src="https://www.youtube.com/embed/GsPvopOOyBs?si=UAKe7YZhgK37mGrI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
      },
      visibility: {
        controlling_field: "testimonial_items.video_source_type",
        operator: "EQUAL",
        controlling_value_regex: "embed",
      },
    }),

    fi.video("Video File", "video_file_media", {
      default: {
        player_id: 304268633846,
        height: 1280,
        width: 720,
        player_type: "hsvideo2",
      },
      visibility: {
        controlling_field: "testimonial_items.video_source_type",
        operator: "EQUAL",
        controlling_value_regex: "video_file",
      },
    }),
  ]),
  group("Buttons", "buttons", { expanded: false }, [
    buttonField({ parentPath: "buttons" }),
  ]),

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
    [
      group(
        "Alignment",
        "alignment",
        { expanded: false },
        fi.boolean("Column Reverse", "column_reverse"),
      ),
    ],
  ),
);
