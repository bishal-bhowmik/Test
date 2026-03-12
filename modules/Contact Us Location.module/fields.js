import { init, moduleFields as fi, group } from "@resultify/hubspot-fields-js";
import { buttonField } from "../../partials/button.js";
import { sectionSettings } from "../../partials/sectionSettings.js";

// We keep this path correct relative to where it will live inside the style tab
const cardBgPath = "style.location_card_background";

// ==========================================
// CUSTOM STYLE: Card Background
// We build this group first, then pass it into sectionSettings!
// ==========================================
const locationCardBackgroundStyles = group("Location Card Background", "location_card_background", {},
  
  fi.boolean("Enable Card Background", "enable", { default: false, display: "toggle" }),

  fi.choice("Background Type", "background_type", {
    default: "image",
    display: "select",
    choices: [["image", "Image"], ["gradient", "Gradient"], ["solid_color", "Solid Color"]],
    visibility: { controlling_field_path: `${cardBgPath}.enable`, operator: "EQUAL", controlling_value_regex: "true" },
  }),

  fi.choice("Background Image Position", "background_image_position", {
    default: "center", display: "select",
    choices: [["top", "Top"], ["center", "Center"], ["bottom", "Bottom"]],
    visibility_rules: "ADVANCED",
    advanced_visibility: {
      boolean_operator: "AND",
      criteria: [
        { controlling_field_path: `${cardBgPath}.background_type`, operator: "EQUAL", controlling_value_regex: "image" },
        { controlling_field_path: `${cardBgPath}.enable`, operator: "EQUAL", controlling_value_regex: "true" },
      ],
    },
  }),

  fi.boolean("Background Overlay", "background_overlay", {
    default: false, display: "toggle",
    visibility_rules: "ADVANCED",
    advanced_visibility: {
      boolean_operator: "AND",
      criteria: [
        { controlling_field_path: `${cardBgPath}.background_type`, operator: "EQUAL", controlling_value_regex: "image" },
        { controlling_field_path: `${cardBgPath}.enable`, operator: "EQUAL", controlling_value_regex: "true" },
      ],
    },
  }),

  fi.gradient("Gradient", "gradient_field", {
    default: {
      side_or_corner: { horizontalSide: "RIGHT", verticalSide: null },
      colors: [{ color: { r: 25, g: 35, b: 23, a: 1 } }, { color: { r: 218, g: 252, b: 0, a: 1 } }],
    },
    visibility_rules: "ADVANCED",
    advanced_visibility: {
      boolean_operator: "AND",
      criteria: [
        { controlling_field_path: `${cardBgPath}.background_type`, operator: "EQUAL", controlling_value_regex: "gradient" },
        { controlling_field_path: `${cardBgPath}.enable`, operator: "EQUAL", controlling_value_regex: "true" },
      ],
    },
  }),

  fi.gradient("Overlay Color", "overlay_color", {
    default: {
      side_or_corner: { horizontalSide: "LEFT", verticalSide: null },
      colors: [{ color: { r: 16, g: 16, b: 0, a: 0.8 } }, { color: { r: 255, g: 255, b: 255, a: 0 } }],
    },
    visibility_rules: "ADVANCED",
    advanced_visibility: {
      boolean_operator: "AND",
      criteria: [
        { controlling_field_path: `${cardBgPath}.background_type`, operator: "EQUAL", controlling_value_regex: "image" },
        { controlling_field_path: `${cardBgPath}.enable`, operator: "EQUAL", controlling_value_regex: "true" },
        { controlling_field_path: `${cardBgPath}.background_overlay`, operator: "EQUAL", controlling_value_regex: "true" },
      ],
    },
  }),

  fi.color("Solid Color", "solid_color", {
    default: { color: "#17270B", opacity: 100 },
    visibility_rules: "ADVANCED",
    advanced_visibility: {
      boolean_operator: "AND",
      criteria: [
        { controlling_field_path: `${cardBgPath}.background_type`, operator: "EQUAL", controlling_value_regex: "solid_color" },
        { controlling_field_path: `${cardBgPath}.enable`, operator: "EQUAL", controlling_value_regex: "true" },
      ],
    },
  }),

  fi.image("Background Image", "background_image", {
    default: {
      size_type: "auto_custom_max",
      src: "https://26291308.fs1.hubspotusercontent-eu1.net/hubfs/26291308/Main%20Content.png",
      alt: "Main Content", loading: "lazy",
    },
    responsive: false, resizable: false, show_loading: false,
    visibility_rules: "ADVANCED",
    advanced_visibility: {
      boolean_operator: "AND",
      criteria: [
        { controlling_field_path: `${cardBgPath}.background_type`, operator: "EQUAL", controlling_value_regex: "image" },
        { controlling_field_path: `${cardBgPath}.enable`, operator: "EQUAL", controlling_value_regex: "true" },
      ],
    },
  })
);


// ==========================================
// INITIALIZE MODULE
// ==========================================
init(
  
  group("Location Details", "location_details", { expanded: true },
    fi.image("Location Image", "image", { default: { src: "../../Images/location.jpg", alt: "Location Image" } }),
    fi.richtext("Section Title", "title", { default: "<h3>New South </br>Wales</h3>" }),
    fi.richtext("Full Address", "description", { default: "42 Glenbrook Street, Parramatta NSW 2150, Australia" }),

    fi.choice("Icon Type", "icon_type", {
      choices: [["hubspot_icon", "Hubspot Icon"], ["custom_svg", "Custom SVG"], ["image", "Image Icon"]],
      default: "image", help_text: "The image icon will not contain the global color",
    }),
    fi.icon("Hubspot Icon", "hubspot_icon", {
      default: { name: "star", type: "SOLID", unicode: "f005" },
      visibility: { controlling_field_path: "location_details.icon_type", operator: "EQUAL", controlling_value_regex: "hubspot_icon" },
    }),
    fi.text("Custom SVG", "custom_svg", {
      default: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.19 0H5.81C2.17 0 0 2.17 0 5.81V14.18C0 17.83 2.17 20 5.81 20H14.18C17.82 20 19.99 17.83 19.99 14.19V5.81C20 2.17 17.83 0 14.19 0ZM15.35 7.05L13.01 14.59C12.45 16.38 9.94 16.41 9.35 14.63L8.65 12.56C8.46 11.99 8.01 11.53 7.44 11.35L5.36 10.65C3.6 10.06 3.62 7.53 5.41 6.99L12.95 4.64C14.43 4.19 15.82 5.58 15.35 7.05Z" fill="#DAFC00"/>
</svg>`,
      visibility: { controlling_field_path: "location_details.icon_type", operator: "EQUAL", controlling_value_regex: "custom_svg" },
    }),
    fi.image("Image Icon", "image_icon", {
      default: { src: "../../Images/Vector.svg", alt: "Image Icon" },
      visibility: { controlling_field_path: "location_details.icon_type", operator: "EQUAL", controlling_value_regex: "image" },
    })
  ), 

  group("Interactive Map", "interactive_map", { expanded: true },
    fi.richtext("Map Title", "map_title", { default: "<h2>Our Gym Location</h2>" }),
    group("Map Settings", "map_settings", { expanded: true },
      fi.choice("How do you want to add the map?", "map_type", {
        choices: [["embed", "Paste Embed Code (HTML)"], ["address", "Type an Address (Auto-generates map)"]],
        default: "address"
      }),
      fi.text("Map Embed Code", "embed_code", {
        visibility: { controlling_field_path: "interactive_map.map_settings.map_type", operator: "EQUAL", controlling_value_regex: "embed" }
      }),
      fi.text("Location Address", "map_address", {
        default: "New South Wales, Australia",
        visibility: { controlling_field_path: "interactive_map.map_settings.map_type", operator: "EQUAL", controlling_value_regex: "address" }
      })
    )
  ),

  
  
  // ==========================================
  // INJECT OUR CUSTOM STYLES INTO THE PARTIAL
  // ==========================================
  // We pass `[locationCardBackgroundStyles]` as the first argument, 
  // which your partial maps to `extraStyleFields`!
  ...sectionSettings([locationCardBackgroundStyles])

);