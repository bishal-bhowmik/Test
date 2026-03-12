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
    "Section Title",
    "content",
    { expanded: true },
    fi.richtext("Rich Text", "section_label", {
      default: "<h3>CONTACT US</h3><h1>Get in Touch</h1>",
    }),
  ),
group(
  "Contact Form",
  "form_section",
  { expanded: true },
  fi.form("Form", "contact_form", {
    default: "",
    embed_versions: ["v2", "v4"],
  }),
),
    ...sectionSettings(
    
  ),


)