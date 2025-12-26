// images
import hero_banner from "../../public/images/hero_banner.png";

// Project main cards from public/images/clay/
// Card 1 and Card 3 use videos, others use images
export const card1Video = "/images/clay/intro.mp4";               // Card 1 main (VIDEO)
import card2 from "../../public/images/clay/462077483.jpg";          // Card 2 main (working)
export const card3Video = "/images/clay/intro2.mp4";              // Card 3 main (VIDEO)
import card4 from "../../public/images/clay/card2.jpg";            // Card 4 main
import card5 from "../../public/images/clay/card5.jpg";      // Card 5 main

// Project sub-cards (overlays) from public/images/clay/
import card1_1 from "../../public/images/clay/card1.1.jpg";
import card2_2 from "../../public/images/clay/card33.jpg";
import card3_3 from "../../public/images/clay/card3.3.jpg";
import card4_4 from "../../public/images/clay/462077483.jpg";
import card5_5 from "../../public/images/clay/card5.5.jpg";

export const PROJECTS_IMAGES = [card1Video, card2, card3Video, card4, card5];
export const PROJECTS_OVERLAY_IMAGES = [card1_1, card2_2, card3_3, card4_4, card5_5];

import brand_strategy from "../../public/images/brand_strategy.png";
import website_design from "../../public/images/website_design.png";
import ui_design from "../../public/images/ui_design.png";

export const SERVICES_IMAGES = [brand_strategy, website_design, ui_design];

export { hero_banner };

// svgs
import acme from "../../public/svgs/ic_acme.svg";
import asgardia from "../../public/svgs/ic_asgardia.svg";
import circle from "../../public/svgs/ic_circle.svg";
import ic_goldline from "../../public/svgs/ic_goldline.svg";
import ic_kanba from "../../public/svgs/ic_kanba.svg";
import ic_utosia from "../../public/svgs/ic_utosia.svg";

export { acme, asgardia, circle, ic_goldline, ic_kanba, ic_utosia };

export const COMPANIES = [
  acme,
  asgardia,
  circle,
  ic_goldline,
  ic_kanba,
  ic_utosia,
];

export const PRELOADER_IMAGES = [hero_banner, ...SERVICES_IMAGES];
