import {
  group,
  styleGroup,
  init,
  moduleFields as fi,
} from "@resultify/hubspot-fields-js";
import { sectionSettings } from "../../partials/sectionSettings.js";

init(
  group(
    "Content",
    "content",
    { expanded: true },
    
    fi.richtext("Rich Text", "section_title", {
      default: "<h2>Real Results, Real Impact</h2>",
    }),
   
  ),
  group(
    "Frequently Asked Questions",
    "faq",
    { expanded: true },
    fi.boolean("Category Enable", "category_enable", {
      default: true,
    }),
    group(
      "Questions ",
      "questions",
      {
        expanded: true,
        visibility: {
          controlling_field: "faq.category_enable",
          operator: "EQUAL",
          controlling_value_regex: false,
        },
      },
      group(
        "Question Item",
        "question_items",
        {
          expanded: true,
          occurrence: {
            default: 4,
            sorting_label_field: "icon_type",
          },
        },
        fi.richtext("Question Text", "question_text", {
          default: "<p>How often should I train per week?</p>",
        }),
        fi.richtext("Question Description", "question_description", {
          default:
            "<p>Most clients see great results with 3–5 sessions weekly, depending on their goals, fitness level, and recovery needs.</p>",
        }),
       fi.boolean("Media Enable", "media_enable", {
          default: true,
          display:"toggle",
        }),
 group("Media Section", "testimonial_items", { expanded: false,

   visibility: {
        controlling_field: "faq.questions.question_items.media_enable",
        operator: "EQUAL",
        controlling_value_regex: true,
      },
  }, [
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
        controlling_field: "faq.questions.question_items.testimonial_items.video_aspect_ratio",
        operator: "EQUAL",
        controlling_value_regex: "custom",
      },
    }),
    fi.number("Height", "custom_ratio_height", {
      default: " 30",
       visibility: {
        controlling_field: "faq.questions.question_items.testimonial_items.video_aspect_ratio",
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
        controlling_field: "faq.questions.question_items.testimonial_items.video_source_type",
        operator: "EQUAL",
        controlling_value_regex: "image",
      },
    }),

    
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
        controlling_field: "faq.questions.question_items.testimonial_items.video_source_type",
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
        controlling_field: "faq.questions.question_items.testimonial_items.video_source_type",
        operator: "EQUAL",
        controlling_value_regex: "video_file",
      },
    }),
  ]),

       fi.boolean("Class Goals Enable", "goal_enable", {
          default: true,
          display:"toggle",
        }),
        group(
      "Class Goals",
      "qualification_item",
      {
        expanded: true,
        occurrence: {
          default: 4,
        },
        visibility: {
          controlling_field: "faq.questions.question_items.goal_enable",
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
          controlling_field: "faq.questions.question_items.qualification_item.icon_type",
          operator: "EQUAL",
          controlling_value_regex: "hubspot_icon",
        },
      }),
      fi.text("Custom SVG", "custom_svg", {
        default:
          '<svg class="icon" aria-hidden="true" viewBox="0 0 512 512"> <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z" /> </svg>',
        placeholder: "Enter SVG Code",
        visibility: {
           controlling_field: "faq.questions.question_items.qualification_item.icon_type",
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
           controlling_field: "faq.questions.question_items.qualification_item.icon_type",
          operator: "EQUAL",
          controlling_value_regex: "image",
        },
      }),
      fi.richtext("Goal text", "qualification", {
        default: "<p><strong>Help people build long-lasting routines</strong></p>",
      }),
      

    ),
      ),
    ),
    group(
      "Category Items ",
      "category_items",
      {
        expanded: true,
        occurrence: {
          default: 4,
          sorting_label_field: "icon_type",
        },
        visibility: {
          controlling_field: "faq.category_enable",
          operator: "EQUAL",
          controlling_value_regex: true,
        },
      },
      fi.choice("Icon Type", "icon_type", {
        choices: [
          ["hubspot_icon", "Hubspot Icon"],
          ["custom_svg", "Custom SVG"],
          ["image", "Image Icon"],
        ],
        default: "image",
      }),
      fi.icon("Hubspot Icon", "hubspot_icon", {
        default: {
          name: "arrow-right",
          type: "SOLID",
          unicode: "f061",
        },
        visibility: {
          controlling_field: "faq.category_items.icon_type",
          operator: "EQUAL",
          controlling_value_regex: "hubspot_icon",
        },
      }),
      fi.text("Custom SVG", "custom_svg", {
        default:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>',
        placeholder: "Enter SVG Code",
        visibility: {
          controlling_field: "faq.category_items.icon_type",
          operator: "EQUAL",
          controlling_value_regex: "custom_svg",
        },
      }),
      fi.image("Image Icon", "image_icon", {
        default: {
          src: "../../Images/icon (1).svg",
          alt: "Image Icon",
        },
        visibility: {
          controlling_field: "faq.category_items.icon_type",
          operator: "EQUAL",
          controlling_value_regex: "image",
        },
      }),
      fi.richtext("Category Title", "category_title", {
        default: "<span>Training & Workouts</span>",
      }),
      group(
        "Questions ",
        "questions",
        { expanded: true },
        group(
          "Question Item",
          "question_items",
          {
            expanded: true,
            occurrence: {
              default: 4,
              sorting_label_field: "icon_type",
            },
          },
          fi.richtext("Question Text", "question_text", {
            default: "<p>How often should I train per week?</p>",
          }),
          fi.richtext("Question Description", "question_description", {
            default:
              "<p>Most clients see great results with 3–5 sessions weekly, depending on their goals, fitness level, and recovery needs.</p>",
          }),
        ),
      ),
    ),
  ),

  

  ...sectionSettings([ 

     group(
    "Section Title Aligment",
    "title_alignment",
    { expanded: false },
    
    fi.alignment("Alignment", "alignment"),
   
  ),
  ]
  ,[fi.number("Content Max width", "content",{
    default:"1000",
    suffix:"px",
  }),
    fi.choice("Layout Type", "layout_type", {
      choices: [
        ["border_full", "Border Full"],
        ["border-half", "Border Half"],
      ],
      default: "border_full",
    }),
  ]),
);
