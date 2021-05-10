import FeatureIcon from "@material-ui/icons/Star";

export const HomePageFeatures = [
  {
    key: "kaisshsn",
    icon: <FeatureIcon />,
    title: "Feature1",
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
      Ea repellendus aspernatur expedita asperiores modi omnis, 
      quos quis error saepe fugiat?`,
  },
  {
    key: "navskabs",
    icon: <FeatureIcon />,
    title: "Feature2",
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
      Ea repellendus aspernatur expedita asperiores modi omnis, 
      quos quis error saepe fugiat?`,
  },
  {
    key: "yhajssns",
    icon: <FeatureIcon />,
    title: "Feature3",
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
      Ea repellendus aspernatur expedita asperiores modi omnis, 
      quos quis error saepe fugiat?`,
  },
];

export const AboutPageFeatures = [
  {
    key: "nksh",
    ltr: true,
    src: "/login.svg",
    header: "lorem ipsum dolor sit amet",
    title: "Lorem Ipsum 1",
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum quod
    perspiciatis consequatur nulla magni commodi optio expedita
    molestiae aliquam asperiores, voluptates unde, accusantium quisquam
    corporis!`,
  },
  {
    key: "nasda",
    ltr: false,
    src: "/about.svg",
    header: "lorem ipsum dolor sit amet",
    title: "Lorem Ipsum 2",
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum quod
    perspiciatis consequatur nulla magni commodi optio expedita
    molestiae aliquam asperiores, voluptates unde, accusantium quisquam
    corporis!`,
  },
  {
    key: "ksjsyd",
    ltr: true,
    src: "/teams.svg",
    header: "lorem ipsum dolor sit amet",
    title: "Lorem Ipsum 3",
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum quod
    perspiciatis consequatur nulla magni commodi optio expedita
    molestiae aliquam asperiores, voluptates unde, accusantium quisquam
    corporis!`,
  },
];

export const AboutPageReviews = [
  {
    key: "asdas",
    name: "Reviewer 1",
    review: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
    Ea repellendus aspernatur expedita asperiores modi omnis, 
    quos quis error saepe fugiat?`,
  },
  {
    key: "aswda",
    name: "Reviewer 2",
    review: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
    Ea repellendus aspernatur expedita asperiores modi omnis, 
    quos quis error saepe fugiat?`,
  },
  {
    key: "ajsjsn",
    name: "Reviewer 3",
    review: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
    Ea repellendus aspernatur expedita asperiores modi omnis, 
    quos quis error saepe fugiat?`,
  },
];

export const PricingPlans = [
  {
    name: "Basic",
    saved: "Save 20%",
    price: 0,
    features: [
      { quantity: 30, metric: "Users / Team" },
      { quantity: 5, metric: "Teams / Organization" },
      { quantity: 2, metric: "Organizations" },
    ],
    buttonText: "SIGN UP FOR FREE",
    redirectTo: "/auth/signup",
  },
  {
    name: "Pro",
    saved: "Save 20%",
    price: 15,
    features: [
      { quantity: 100, metric: "Users / Team" },
      { quantity: 10, metric: "Teams / Organization" },
      { quantity: 5, metric: "Organizations" },
    ],
    buttonText: "GET STARTED",
    redirectTo: "/auth/signup",
  },
  {
    name: "Enterprise",
    saved: "Custom",
    price: 30,
    features: [
      { quantity: "Unlimited", metric: "Users / Team" },
      { quantity: "Unlimited", metric: "Teams / Organization" },
      { quantity: "Unlimited", metric: "Organizations" },
    ],
    buttonText: "CONTACT US",
    redirectTo: "/auth/signup",
  },
];
