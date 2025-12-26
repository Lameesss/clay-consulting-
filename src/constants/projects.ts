import { PROJECTS_IMAGES, PROJECTS_OVERLAY_IMAGES, SERVICES_IMAGES } from "./images";

export const PROJECTS: IProjects[] = [
  {
    name: "Acme",
    year: "2024",
    image: PROJECTS_IMAGES[0],
    overlayImage: PROJECTS_OVERLAY_IMAGES[0],
  },
  {
    name: "Kanba",
    year: "2024",
    image: PROJECTS_IMAGES[1],
    overlayImage: PROJECTS_OVERLAY_IMAGES[1],
  },
  {
    name: "Goldline",
    year: "2024",
    image: PROJECTS_IMAGES[2],
    overlayImage: PROJECTS_OVERLAY_IMAGES[2],
  },
  {
    name: "Utosia",
    year: "2024",
    image: PROJECTS_IMAGES[3],
    overlayImage: PROJECTS_OVERLAY_IMAGES[3],
  },
  {
    name: "Nexus",
    year: "2023",
    image: PROJECTS_IMAGES[4],
    overlayImage: PROJECTS_OVERLAY_IMAGES[4],
  },
];

export const SERVICES: IServices[] = [
  {
    title: ["Brand", "Strategy"],
    description:
      "Build a strong, cohesive brand identity to connect with your audience.",
    details: {
      title: "Branding Services",
      services: [
        "Brand Discovery",
        "Brand Positioning",
        "Visual Identity Design",
        "Brand Guidelines ",
      ],
    },
    image: SERVICES_IMAGES[0],
  },
  {
    title: ["System", "Design"],
    description:
      "Create tailored, scalable systems that engage clients and drive results.",
    details: {
      title: "Website Services",
      services: [
        "Website Design",
        "Webflow Development",
        "Framer Development",
        "Website Support",
      ],
    },
    image: SERVICES_IMAGES[1],
  },
  {
    title: ["Flow", "Design"],
    description:
      "Enhance client workflows through intuitive and user-focused system solutions.",
    details: {
      title: "UI/UX Services",
      services: [
        "User Research",
        "Usability Testing",
        "Wireframing",
        "UI/UX Audits",
      ],
    },
    image: SERVICES_IMAGES[2],
  },
];
