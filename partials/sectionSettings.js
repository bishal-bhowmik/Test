import { group, moduleFields as fi } from "@resultify/hubspot-fields-js";

export function sectionSettings(extraStyleFields = [], extraLayoutFields = []) {
  const bgPath = "style.background";

  return [
    // ==========================================================================
    // GROUP 1: Style
    // ==========================================================================
    group(
      "Style",
      "style",
      {
        tab: "STYLE",
      },
      [
        // ----------------------------------------
        // BACKGROUND GROUP
        // ----------------------------------------
        group(
          "Background",
          "background",
          {},
          [
            // 1. Enable
            fi.boolean("Enable", "enable", {
              default: false,
              display: "toggle",
            }),

            // 2. Background Type
            fi.choice("Background Type", "background_type", {
              default: "image",
              display: "select",
              choices: [
                ["image", "Image"],
                ["gradient", "Gradient"],
                ["solid_color", "Solid Color"],
              ],
              visibility: {
                controlling_field_path: `${bgPath}.enable`,
                operator: "EQUAL",
                controlling_value_regex: "true",
              },
            }),

            // 3. Background Image Position
            fi.choice("Background Image Position", "background_image_position", {
              default: "center",
              display: "select",
              choices: [
                ["top", "Top"],
                ["center", "Center"],
                ["bottom", "Bottom"],
              ],
              visibility_rules: "ADVANCED",
              advanced_visibility: {
                boolean_operator: "AND",
                criteria: [
                  {
                    controlling_field_path: `${bgPath}.background_type`,
                    operator: "EQUAL",
                    controlling_value_regex: "image",
                  },
                  {
                    controlling_field_path: `${bgPath}.enable`,
                    operator: "EQUAL",
                    controlling_value_regex: "true",
                  },
                ],
              },
            }),

            // 4. Background Overlay (Toggle)
            fi.boolean("Background Overlay", "background_overlay", {
              default: false,
              display: "toggle",
              visibility_rules: "ADVANCED",
              advanced_visibility: {
                boolean_operator: "AND",
                criteria: [
                  {
                    controlling_field_path: `${bgPath}.background_type`,
                    operator: "EQUAL",
                    controlling_value_regex: "image",
                  },
                  {
                    controlling_field_path: `${bgPath}.enable`,
                    operator: "EQUAL",
                    controlling_value_regex: "true",
                  },
                ],
              },
            }),

            // 5. Gradient Field
            fi.gradient("Gradient", "gradient_field", {
              default: {
                side_or_corner: {
                  horizontalSide: "RIGHT",
                  verticalSide: null,
                },
                colors: [
                  {
                    color: { r: 25, g: 35, b: 23, a: 1 },
                  },
                  {
                    color: { r: 218, g: 252, b: 0, a: 1 },
                  },
                ],
              },
              visibility_rules: "ADVANCED",
              advanced_visibility: {
                boolean_operator: "AND",
                criteria: [
                  {
                    controlling_field_path: `${bgPath}.background_type`,
                    operator: "EQUAL",
                    controlling_value_regex: "gradient",
                  },
                  {
                    controlling_field_path: `${bgPath}.enable`,
                    operator: "EQUAL",
                    controlling_value_regex: "true",
                  },
                ],
              },
            }),

            // 6. Overlay Color (Gradient)
            fi.gradient("Overlay Color", "overlay_color", {
              default: {
                side_or_corner: {
                  horizontalSide: "LEFT",
                  verticalSide: null,
                },
                colors: [
                  {
                    color: { r: 16, g: 16, b: 0, a: 0.8 },
                  },
                  {
                    color: { r: 255, g: 255, b: 255, a: 0 },
                  },
                ],
              },
              visibility_rules: "ADVANCED",
              advanced_visibility: {
                boolean_operator: "AND",
                criteria: [
                  {
                    controlling_field_path: `${bgPath}.background_type`,
                    operator: "EQUAL",
                    controlling_value_regex: "image",
                  },
                  {
                    controlling_field_path: `${bgPath}.enable`,
                    operator: "EQUAL",
                    controlling_value_regex: "true",
                  },
                  {
                    controlling_field_path: `${bgPath}.background_overlay`,
                    operator: "EQUAL",
                    controlling_value_regex: "true",
                  },
                ],
              },
            }),

            // 7. Solid Color
            fi.color("Solid Color", "solid_color", {
              default: {
                color: "#17270B",
                opacity: 100,
              },
              visibility_rules: "ADVANCED",
              advanced_visibility: {
                boolean_operator: "AND",
                criteria: [
                  {
                    controlling_field_path: `${bgPath}.background_type`,
                    operator: "EQUAL",
                    controlling_value_regex: "solid_color",
                  },
                  {
                    controlling_field_path: `${bgPath}.enable`,
                    operator: "EQUAL",
                    controlling_value_regex: "true",
                  },
                ],
              },
            }),

            // 8. Background Image
            fi.image("Background Image", "background_image", {
              default: {
                size_type: "auto_custom_max",
                src: "https://26291308.fs1.hubspotusercontent-eu1.net/hubfs/26291308/Main%20Content.png",
                alt: "Main Content",
                loading: "lazy",
              },
              responsive: false,
              resizable: false,
              show_loading: false,
              visibility_rules: "ADVANCED",
              advanced_visibility: {
                boolean_operator: "AND",
                criteria: [
                  {
                    controlling_field_path: `${bgPath}.background_type`,
                    operator: "EQUAL",
                    controlling_value_regex: "image",
                  },
                  {
                    controlling_field_path: `${bgPath}.enable`,
                    operator: "EQUAL",
                    controlling_value_regex: "true",
                  },
                ],
              },
            }),
          ]
        ),

        // ----------------------------------------
        // NEW ANIMATION GROUP
        // ----------------------------------------
        group(
          "Animation",
          "animation",
          {},
          [
            fi.boolean("Enable Heading Animation", "enable_heading_animation", {
              default: false,
              display: "toggle",
            }),
            fi.boolean("Enable Body Text Animation", "enable_body_text_animation", {
              default: false,
              display: "toggle",
            }),
            fi.boolean("Enable Section Animation", "enable_section_animation", {
              default: false,
              display: "toggle",
            }),
          ]
        ),

        ...extraStyleFields,
      ]
    ),

    // ==========================================================================
    // GROUP 2: Layout
    // ==========================================================================
    group(
      "Layout",
      "layout_alignment",
      {
        tab: "CONTENT",
      },
      [
        // 1. Section Max Width
        fi.number("Section Max Width", "section_max_width", {
          default: 1280,
          display: "text",
          step: 1,
          suffix: "px",
        }),
        ...extraLayoutFields,
      ]
    ),
  ];
}