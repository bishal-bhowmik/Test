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
      default: "<h2>Our Story</h2>",
      help_text: "The main heading for the achievements section"
    }),
     fi.boolean(" Subtitle Enable", "enable", {default: true,
      display: "toggle",
       
    }),
    fi.richtext("Section Subtitle", "section_subtitle", {
      default: "<h5>Strength Builder</h5><p>Fitmax began with a simple belief: fitness should be accessible, personal, and suitable for everyone. No shortcuts. No pressure. Just science-backed training, real coaching, and a system that adapts to your everyday life.</p><p>&nbsp;</p><h5>Strength Builder</h5><p>Fitmax began with a simple belief: fitness should be accessible, personal, and suitable for everyone. No shortcuts. No pressure. Just science-backed training, real coaching, and a system that adapts to your everyday life.</p>",
     visibility: {
          controlling_field: "content.enable",
          operator: "EQUAL",
          controlling_value_regex:true,
        },
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
   group(
    "Lists",
    "qualification_section",
    { expanded: true },
     fi.boolean("Enable", "enable", {default: true,display: "toggle"}),
    group(
      "Qualification Item",
      "qualification_item",
      {
        expanded: true,
        occurrence: {
          default: 4,
        },
        visibility: {
          controlling_field: "qualification_section.enable",
          operator: "EQUAL",
          controlling_value_regex:true,
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
        default: "<p><strong>Help people build long-lasting routines</strong></p>",
      }),
      

    ),
  ),
  
  group(
    "Counter Stats",
    "counter_stats",
    {
      expanded: true,
    },
     fi.boolean("Enable", "Enable", {default: true,display: "toggle"}),
    group(
      "Counter Items",
      "counter_items",
      {
        occurrence: {
          min: 1,
          max: 3,
          default: 3,
          sorting_label_field: "counter_stats.counter_items.stat_number", 
        },
      },
      fi.richtext("Stat Number", "stat_number", {
        default: "<h3>10+</h3>",
       
      }),
      fi.richtext("Stat Label", "stat_label", {
        default: "<p>certifications &qulifications</p>",
        
      }),
    ),
  ),
   group(
    "Card List",
    "card_list",
    {
      expanded: true,
    },
    fi.boolean("Enable", "enable", {default: true,display: "toggle"}),
    fi.richtext("List", "list", {
      default: "<h5>Class Details</h5><ul><li>High-Intensity Interval Training with quick breaks</li><li>High-Intensity Interval Training with quick breaks</li><li>High-Intensity Interval Training with quick breaks</li><li>High-Intensity Interval Training with quick breaks</li></ul>",
     
    }),
  ),
 group(
    "Buttons",
    "buttons",
    {
      expanded: true,
    },
    fi.boolean("List Button Enable", "Enable", {default: true,display: "toggle"}),
    [buttonField({ parentPath: "buttons" })],
  ),

 
  ...sectionSettings([],[
    fi.number("Content Width", "content_width", {
    default: "510",
    suffix:"px",
  }),
  ]),
);