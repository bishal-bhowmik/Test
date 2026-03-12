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
      default: "<h2>verify bmi</h2>",
    }),
    fi.richtext("Description", "description", {
      default: "<p>Instantly find out if your Body Mass Index (BMI) falls in the underweight, normal, overweight, or obesity range. A simple number, but an important first step in understanding your health.</p>",
    }),
   
  ),
  
  group(
    "Media Section",
    "media_section",
    { expanded: false },
    fi.image("Background Image", "background_image", {
      default: {
        src: "../../Images/da0983d8db181622badc60f2d99c6fc4fbc201fe.png",
        alt: "Fitness Programs",
      },
      
    }),
 
  ),
  group(
    "BMI",
    "bmi",
    { expanded: false },
    
    fi.richtext("Caculator Title", "section_title", {
      default: "<h6>BMI Calculator</h6>",
    }),
    
   
  ),
   group(
    "Pop Up",
    "pop_up",
    { expanded: false },
     group(
    "Status Images",
    "status_images",
    { expanded: false },
    fi.image("Underweight", "underweight", {
      default: {
        src: "../../Images/Underweight.png",
        alt: "Fitness Programs",
      }}),
    fi.image("Normal", "normal", {
      default: {
        src: "../../Images/Normal Weight.png",
        alt: "Fitness Programs",
      }}),
    fi.image("Overweight", "overweight", {
      default: {
        src: "../../Images/Overweight.png",
        alt: "Fitness Programs",
      }}),

    fi.image("Obese", "obese", {
      default: {
        src: "../../Images/Obese.png",
        alt: "Fitness Programs",
      }}),
    fi.image("Morbidly Obese", "morbidly_obese", {
      default: {
        src: "../../Images/morbidly_obese.png",
        alt: "Fitness Programs",
      }}),
 
  ),
 
  ),
  
  ...sectionSettings([ 
]
  ,[
  ]),
);
