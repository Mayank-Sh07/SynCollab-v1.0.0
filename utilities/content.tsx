import FeatureIcon from "@material-ui/icons/Star";

export const HomePageFeatures = [
  {
    key: "kaisshsn",
    icon: <FeatureIcon />,
    title: "OKR Process Made Simple",
    description: `Replace difficult to use spreadsheets with tools that are meant to manage OKRs.
    Align teams to strategic outcomes with measurable key results, ensuring that everyone is working without losing sight of objectives.
    `,
  },
  {
    key: "navskabs",
    icon: <FeatureIcon />,
    title: "Collaborate on Priorities",
    description: `Quickly access your priorities and see where things stand for your teams and direct all the outcomes.
    Create natural opportunities for feedback and improve collaboration between team members on what really matters.
    `,
  },
  {
    key: "yhajssns",
    icon: <FeatureIcon />,
    title: "Fast Paced Progress",
    description: `With SynCollab it is easy to quickly set, share and align Objectives that drive company goals forward.
    Break through the engagement barrier and facilitate weekly best practices to foster communication.
    `,
  },
];

export const AboutPageFeatures = [
  {
    key: "nksh",
    ltr: true,
    src: "/working_remotely.svg",
    header: "here's all you need to know about",
    title: "How it works?",
    description: `As stated earlier, using the powers of OKR’s is what this whole software is based on. Anyone in the organization depending on the post an induvial is given, has the ability to create and set goals. Furthermore, you can also create subgoal and enter a unit of progress (in %, currency or just a plain number) to help you track where you stand in that goal.
    `,
  },
  {
    key: "nasda",
    ltr: false,
    src: "/Scrum_board.svg",
    header: "Many many reasons",
    title: "Why do you need it?",
    description: `
    Our simple interface helps teams set clear, measurable goals. Teams use the OKR tool to track progress, surface concerns, and celebrate wins.
If you’re an individual whose in dire need of assistance and motivation, the Syncollab is exactly what you desire. If you really want to keep yourself organized, intact with all your primary tasks and improve productivity, it’s high time you consider this.
    `,
  },
  {
    key: "ksjsyd",
    ltr: true,
    src: "/Done_checking.svg",
    header: "The new and the best",
    title: "Objectives and Key results",
    description: ` 
The OKR methodology is a collaborative, goal-setting framework that helps teams and organizations reach their goals through identifiable and measurable results.
OKRs aren’t new to the business world. The reason they’re rising in popularity is because the way we do business is changing. OKRs fit the way business happens today. Companies from Google to Adobe have rolled out OKRs to accelerate growth and drive innovation by helping teams see how their work fits into the overall company’s objectives.`,
  },
];

export const AboutPageReviews = [
  {
    key: "aswda",
    name: "Giorno Giovanna",
    review: `Being able to see the tasks my teammates accomplish, how they ladder up to an OKR. I also really liked the dashboard as it allows you to see how your team is doing to achieve a common goal.`,
  },
  {
    key: "ajsjsn",
    name: "Eren Yaeger",
    review: `When joined my current company I was happy to learn SynCollab is implemented and we can do everything in one place. The platform really helps you as an individual and as a part of a team, and a company.`,
  },
  {
    key: "asdas",
    name: "Kammy Samuel",
    review: `Fantastic web application! I don’t know how I’d have gotten things done on time if it weren’t for Syncollabs amazing OKR building dashboard and colloboration setup, especially the roles.`,
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
