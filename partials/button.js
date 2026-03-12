import { group, moduleFields as fi } from "@resultify/hubspot-fields-js";

export function buttonField({
  label = "Button List",
  name = "button_repeater",
  parentPath = "",
  options = {},
} = {}) {
  const Path = parentPath ? `${parentPath}.${name}` : name;
  return group(
    label,
    name,
    {
      ...options,
      occurrence: {
        min: 1,
        max: 5,
        default: 1,
        ...options.occurrence,
      },
      default: [
        {
          button_text: "Get Started",
          link: {
            url: { type: "EXTERNAL", href: "https://www.google.com" },
          },
          button_type: "primary",
          turn_on_button_icon: true,
          button_icon_type: "svg",
          svg_icon:
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">  <path d="M13.4804 19.9083C13.4956 19.9235 13.9597 20.0399 14.5117 20.1668C15.0639 20.2937 15.5216 20.3781 15.5289 20.3545C15.5362 20.3309 15.5933 19.9477 15.6558 19.5029C15.7813 18.6098 16.0851 17.567 16.4097 16.9148C17.4217 14.8823 19.2372 13.5364 21.4393 13.1866L22 13.0975L22 12.1997L22 11.3017L21.4918 11.2164C18.162 10.6578 15.9912 8.16812 15.5851 4.44229C15.5586 4.199 15.5269 4 15.5147 4C15.4024 4 13.5416 4.44845 13.5064 4.48397C13.481 4.50966 13.4999 4.73774 13.5486 4.99073C14.087 7.79214 15.6287 10.0717 17.6294 11.0249L18.1094 11.2535L8.24046 11.2714L2 11.2828L2 13.1L8.25651 13.1113L18.1021 13.1293L17.4963 13.4363C15.9244 14.2326 14.68 15.7947 13.9472 17.8914C13.7383 18.4888 13.4232 19.8506 13.4804 19.9083Z" fill="#101000"/></svg>',
          custom_icon: {
            name: "Alternate Long Arrow Right",
            unicode: "f30b",
            type: "SOLID",
          },
          keep_only_icon: false,
          override_styles: false,
        },
      ],
    },
    [
      // 1. Button Label
      fi.text("Button Label", "button_text", {
        default: "Get Started",
        allow_new_line: false,
        visibility: {
          // FIX: Added `${Path}.` to path
          controlling_field_path: `${Path}.keep_only_icon`,
          operator: "EQUAL",
          controlling_value_regex: "false",
        },
      }),

      // 2. Button Link
      fi.link("Button Link", "link", {
        default: {
          url: { type: "EXTERNAL", href: "https://www.google.com" },
        },
        supported_types: [
          "EXTERNAL",
          "CONTENT",
          "FILE",
          "EMAIL_ADDRESS",
          "BLOG",
        ],
        show_advanced_rel_options: false,
      }),

      // 3. Button Variant
      fi.choice("Button Variant", "button_type", {
        default: "primary",
        display: "select",
        choices: [
          ["primary", "Primary Button"],
          ["secondary", "Secondary Button"],
        ],
        visibility: {
          // FIX: Added `${Path}.` to path
          controlling_field_path: `${Path}.keep_only_icon`,
          operator: "EQUAL",
          controlling_value_regex: "false",
        },
      }),

      // 4. Turn on Button Icon
      fi.boolean("Turn on Button Icon", "turn_on_button_icon", {
        default: false,
        display: "toggle",
      }),

      // 5. Button Icon Type
      fi.choice("Button Icon Type", "button_icon_type", {
        default: "svg",
        display: "select",
        choices: [
          ["svg", "SVG Icon"],
          ["custom", "Custom Icon"],
          [ "image", "Image Icon" ],
        ],
        visibility: {
          // FIX: Added `${Path}.` to path
          controlling_field_path: `${Path}.turn_on_button_icon`,
          operator: "EQUAL",
          controlling_value_regex: "true",
        },
      }),

      // 6. SVG Icon
      fi.text("SVG Icon", "svg_icon", {
        default:
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">  <path d="M13.4804 19.9083C13.4956 19.9235 13.9597 20.0399 14.5117 20.1668C15.0639 20.2937 15.5216 20.3781 15.5289 20.3545C15.5362 20.3309 15.5933 19.9477 15.6558 19.5029C15.7813 18.6098 16.0851 17.567 16.4097 16.9148C17.4217 14.8823 19.2372 13.5364 21.4393 13.1866L22 13.0975L22 12.1997L22 11.3017L21.4918 11.2164C18.162 10.6578 15.9912 8.16812 15.5851 4.44229C15.5586 4.199 15.5269 4 15.5147 4C15.4024 4 13.5416 4.44845 13.5064 4.48397C13.481 4.50966 13.4999 4.73774 13.5486 4.99073C14.087 7.79214 15.6287 10.0717 17.6294 11.0249L18.1094 11.2535L8.24046 11.2714L2 11.2828L2 13.1L8.25651 13.1113L18.1021 13.1293L17.4963 13.4363C15.9244 14.2326 14.68 15.7947 13.9472 17.8914C13.7383 18.4888 13.4232 19.8506 13.4804 19.9083Z" fill="#101000"/></svg>',
        allow_new_line: false,
        visibility_rules: "ADVANCED",
        advanced_visibility: {
          boolean_operator: "AND",
          criteria: [
            // FIX: Added `${Path}.` to paths
            {
              controlling_field_path: `${Path}.turn_on_button_icon`,
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
            {
              controlling_field_path: `${Path}.button_icon_type`,
              operator: "EQUAL",
              controlling_value_regex: "svg",
            },
          ],
        },
      }),

      // 7. Custom Icon
      fi.icon("Custom Icon", "custom_icon", {
        default: {
          name: "Alternate Long Arrow Right",
          unicode: "f30b",
          type: "SOLID",
        },
        visibility_rules: "ADVANCED",
        advanced_visibility: {
          boolean_operator: "AND",
          criteria: [
            // FIX: Added `${Path}.` to paths
            {
              controlling_field_path: `${Path}.turn_on_button_icon`,
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
            {
              controlling_field_path: `${Path}.button_icon_type`,
              operator: "EQUAL",
              controlling_value_regex: "custom",
            },
          ],
        },
      }),

      fi.image("Button Icon Image", "button_icon_image", {
        default: {
            src : "https://242549284.fs1.hubspotusercontent-na2.net/hubfs/242549284/arrow-right.png",
            alt: "Arrow icon",
            height: 24,
            width: 24,
          },
           help_text : "⚠️ CAUTION: When using image icons, icon colors cannot be changed. The image will display as-is.",
        visibility_rules: "ADVANCED",
        advanced_visibility: {
          boolean_operator: "AND",
          criteria: [
            {
              controlling_field_path: `${Path}.turn_on_button_icon`,
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
            {
              controlling_field_path: `${Path}.button_icon_type`,
              operator: "EQUAL",
              controlling_value_regex: "image",
            },
          ],
        },
      }),

      // 8. Keep Only Icon
      fi.boolean("Keep Only Icon", "keep_only_icon", {
        default: false,
        display: "checkbox",
        visibility: {
          // FIX: Added `${Path}.` to path
          controlling_field_path: `${Path}.turn_on_button_icon`,
          operator: "EQUAL",
          controlling_value_regex: "true",
        },
      }),

      // 9. Override Styles
      fi.boolean("Override Styles", "override_styles", {
        default: false,
        display: "toggle",
      }),

      // 10. Show/Hide Color Settings
      fi.boolean("Show/Hide Color Settings", "hide_show_color_settings", {
        default: false,
        display: "checkbox",
        visibility: {
          // FIX: Added `${Path}.` to path
          controlling_field_path: `${Path}.override_styles`,
          operator: "EQUAL",
          controlling_value_regex: "true",
        },
      }),

      // 11. Custom Text Color
      fi.color("Text Color", "custom_text_color", {
        help_text: "Leave empty to use theme default",
        visibility_rules: "ADVANCED",
        advanced_visibility: {
          boolean_operator: "AND",
          criteria: [
            // FIX: Added `${Path}.` to paths
            {
              controlling_field_path: `${Path}.override_styles`,
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
            {
              controlling_field_path: `${Path}.hide_show_color_settings`,
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
          ],
        },
      }),

      // 12. Custom Background Color
      fi.color("Background Color", "custom_bg_color", {
        help_text: "Leave empty to use theme default",
        visibility_rules: "ADVANCED",
        advanced_visibility: {
          boolean_operator: "AND",
          criteria: [
            // FIX: Added `${Path}.` to paths
            {
              controlling_field_path: `${Path}.override_styles`,
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
            {
              controlling_field_path: `${Path}.hide_show_color_settings`,
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
          ],
        },
      }),

      // 13. Show/Hide Hover Settings
      fi.boolean("Show/Hide Hover Settings", "hide_show_hover_settings", {
        default: false,
        display: "checkbox",
        visibility: {
          // FIX: Added `${Path}.` to path
          controlling_field_path: `${Path}.override_styles`,
          operator: "EQUAL",
          controlling_value_regex: "true",
        },
      }),

      // 14. Hover Background Color
      fi.color("Hover Background Color", "hover_bg_color", {
        help_text: "Leave empty to use theme default",
        visibility_rules: "ADVANCED",
        advanced_visibility: {
          boolean_operator: "AND",
          criteria: [
            // FIX: Added `${Path}.` to paths
            {
              controlling_field_path: `${Path}.override_styles`,
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
            {
              controlling_field_path: `${Path}.hide_show_hover_settings`,
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
          ],
        },
      }),

      // 15. Hover Text Color
      fi.color("Hover Text Color", "hover_text_color", {
        help_text: "Leave empty to use theme default",
        visibility_rules: "ADVANCED",
        advanced_visibility: {
          boolean_operator: "AND",
          criteria: [
            // FIX: Added `${Path}.` to paths
            {
              controlling_field_path: `${Path}.override_styles`,
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
            {
              controlling_field_path: `${Path}.hide_show_hover_settings`,
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
          ],
        },
      }),

      // 16. Show/Hide Border Settings
      fi.boolean("Show/Hide Border Settings", "hide_show_border_settings", {
        default: false,
        display: "checkbox",
        visibility: {
          // FIX: Added `${Path}.` to path
          controlling_field_path: `${Path}.override_styles`,
          operator: "EQUAL",
          controlling_value_regex: "true",
        },
      }),

      // 17. Border Radius
      fi.number("Border Radius", "custom_border_radius", {
        display: "slider",
        step: 1,
        suffix: "px",
        help_text: "In pixels - Leave empty to use theme default",
        visibility_rules: "ADVANCED",
        advanced_visibility: {
          boolean_operator: "AND",
          criteria: [
            // FIX: Added `${Path}.` to paths
            {
              controlling_field_path: `${Path}.override_styles`,
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
            {
              controlling_field_path: `${Path}.hide_show_border_settings`,
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
          ],
        },
      }),

      // 18. Hover Border Color
      fi.color("Hover Border Color", "hover_border_color", {
        help_text: "Leave empty to use theme default",
        visibility_rules: "ADVANCED",
        advanced_visibility: {
          boolean_operator: "AND",
          criteria: [
            // FIX: Added `${Path}.` to paths
            {
              controlling_field_path: `${Path}.override_styles`,
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
            {
              controlling_field_path: `${Path}.hide_show_border_settings`,
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
          ],
        },
      }),

      // 19. Hover Border Width
      fi.number("Hover Border Width", "hover_border_width", {
        display: "text",
        step: 1,
        suffix: "px",
        help_text: "In pixels - Leave empty to use theme default (2px)",
        visibility_rules: "ADVANCED",
        advanced_visibility: {
          boolean_operator: "AND",
          criteria: [
            // FIX: Added `${Path}.` to paths
            {
              controlling_field_path: `${Path}.override_styles`,
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
            {
              controlling_field_path: `${Path}.hide_show_border_settings`,
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
          ],
        },
      }),

      // 20. Show/Hide Font Settings
      fi.boolean("Show/Hide Font Settings", "hide_show_font_settings", {
        default: false,
        display: "checkbox",
        visibility: {
          // FIX: Added `${Path}.` to path
          controlling_field_path: `${Path}.override_styles`,
          operator: "EQUAL",
          controlling_value_regex: "true",
        },
      }),

      // 21. Font Settings
      fi.font("Font Settings", "button_font", {
        help_text: "Leave empty to use theme default",
        load_external_fonts: true,
        visibility_rules: "ADVANCED",
        advanced_visibility: {
          boolean_operator: "AND",
          criteria: [
            // FIX: Added `${Path}.` to paths
            {
              controlling_field_path: `${Path}.override_styles`,
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
            {
              controlling_field_path: `${Path}.hide_show_font_settings`,
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
          ],
        },
      }),

      // 22. Show/Hide Padding Settings
      fi.boolean("Show/Hide Padding Settings", "hide_show_padding_settings", {
        default: false,
        display: "checkbox",
        visibility: {
          // FIX: Added `${Path}.` to path
          controlling_field_path: `${Path}.override_styles`,
          operator: "EQUAL",
          controlling_value_regex: "true",
        },
      }),

      // 23. Vertical Padding
      fi.number("Vertical Padding", "padding_vertical", {
        display: "text",
        step: 1,
        suffix: "px",
        help_text: "In pixels - Leave empty to use theme default",
        visibility_rules: "ADVANCED",
        advanced_visibility: {
          boolean_operator: "AND",
          criteria: [
            // FIX: Added `${Path}.` to paths
            {
              controlling_field_path: `${Path}.override_styles`,
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
            {
              controlling_field_path: `${Path}.hide_show_padding_settings`,
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
          ],
        },
      }),

      // 24. Horizontal Padding
      fi.number("Horizontal Padding", "padding_horizontal", {
        display: "text",
        step: 1,
        suffix: "px",
        help_text: "In pixels - Leave empty to use theme default",
        visibility_rules: "ADVANCED",
        advanced_visibility: {
          boolean_operator: "AND",
          criteria: [
            // FIX: Added `${Path}.` to paths
            {
              controlling_field_path: `${Path}.override_styles`,
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
            {
              controlling_field_path: `${Path}.hide_show_padding_settings`,
              operator: "EQUAL",
              controlling_value_regex: "true",
            },
          ],
        },
      }),
    ],
  );
}
