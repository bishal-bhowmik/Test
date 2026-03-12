import { buttonField } from "../../partials/button.js";
import {
  init,
  group,
  styleGroup,
  moduleFields as fi,
} from "@resultify/hubspot-fields-js";

import { sectionSettings } from "../../partials/sectionSettings.js";


init(
   group(
    "Content",
    "content",
    {
      expanded: false,
    },
    [
      fi.richtext("Text", "text", {
        default: "<h2> Anywhere, Anytime</h2><p>Our online coaching program ensures you never miss a workout. Whether at home or traveling, our platform lets you train on your terms.</p>",
      }),
    ],
  ),
   group(
    "Background & Media",
    "background",
    {
      expanded: false,
    },
    [
        fi.choice("Image Position", "image_position", {
      default: "left",
      display: "select",
      choices: [
        ["left", "Left"],
        ["right", "Right"],
      ],
    }),
      fi.image("Image", "image", {
    resizable: false, 
    show_loading: false, 
    responsive: false,
      default: {
            src: "https://26291308.fs1.hubspotusercontent-eu1.net/hubfs/26291308/FitMax%20Theme/strong-sport-man.png",
            alt: "Strong Sport Man",
          },

  }),
   fi.color("Overlay Color", "overlay_color",{
    default: "#DAFC00",
     show_opacity:false,
   }),

    ],
  ),

 
buttonField(),
...sectionSettings([],[]),


  );

