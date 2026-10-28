export const PHONE = "18002096222";
export const PHONE_DISPLAY = "1-800-209-6222";
export const MOBILE = "8448441607";
export const MOBILE_DISPLAY = "8448 441 607";
export const EMAIL = "greaternoida@maacmail.com";
export const OFFICIAL_SITE = "https://www.maacindia.com/";
export const SCHOLARSHIP_DEADLINE = "2026-10-31T23:59:59+05:30";

export const courses = [
  {
    id: "animation",
    title: "3D Animation",
    code: "AD3D Edge Plus",
    duration: "18 – 24 Mos",
    badge: "Flagship Course",
    badgeTone: "crimson",
    image: "/images/animation.jpg",
    powered: true,
    summary:
      "Master the art of storytelling through high-quality animation and industry-standard techniques.",
    roles: [
      "3D Animator",
      "Character Designer",
      "Storyboard Artist",
      "Lighting Artist",
    ],
  },
  {
    id: "vfx",
    title: "Visual Effects",
    code: "ADVFX Plus",
    duration: "18 Mos",
    badge: "Studio Pipeline",
    badgeTone: "gold",
    image: "/images/vfx.jpg",
    powered: true,
    summary:
      "Develop high-end visual effects skills for film, television, and OTT using industry-standard tools.",
    roles: [
      "VFX Artist",
      "Compositing Artist",
      "Roto Artist",
      "Matchmove Artist",
    ],
  },
  {
    id: "game",
    title: "Game Design",
    code: "ADIDG Plus",
    duration: "15 – 18 Mos",
    badge: "Next-Gen Gaming",
    badgeTone: "cyan",
    image: "/images/gaming.jpg",
    powered: true,
    summary:
      "Gain expertise in game design, asset creation, and real-time rendering for mobile, online, and console gaming.",
    roles: [
      "Game Environment Artist",
      "3D Asset Designer",
      "Level Designer",
      "Character Animator",
    ],
  },
  {
    id: "content",
    title: "Digital Content Creation",
    code: "APDMC Plus",
    duration: "12 Mos",
    badge: "Trending for Creators",
    badgeTone: "gold",
    image: "/images/content.jpg",
    powered: true,
    summary:
      "Build a career in digital media, social content, short filmmaking, and video production — ideal for influencers and YouTubers.",
    roles: [
      "Content Creator",
      "Social Media Strategist",
      "Video Producer",
      "YouTube Creator",
    ],
  },
  {
    id: "motion",
    title: "Motion Graphics & Broadcast Design",
    code: "APMG / Broadcast Plus",
    duration: "12 – 15 Mos",
    badge: "Broadcast Ready",
    badgeTone: "crimson",
    image: "/images/motion.jpg",
    powered: false,
    summary:
      "Explore motion graphics, advertising, and digital media production for film and television.",
    roles: [
      "Motion Graphics Designer",
      "Broadcast Designer",
      "Cinematic Animator",
    ],
  },
  {
    id: "film",
    title: "Digital Filmmaking",
    code: "Next Gen 3D Filmmaking",
    duration: "12 Mos",
    badge: "CreatorX Powered",
    badgeTone: "cyan",
    image: "/images/film.jpg",
    powered: true,
    summary:
      "Cinematography, editing, sound, and next-gen 3D filmmaking workflows for ads, OTT, and independent IPs.",
    roles: ["Video Editor", "Cinematographer", "Film Director", "Content Creator"],
  },
] as const;

export const programOptions = [
  "3D Animation (AD3D Edge Plus)",
  "Visual Effects (ADVFX Plus)",
  "Game Art & Design (ADIDG Plus)",
  "Digital Content Creation (APDMC Plus)",
  "Motion Graphics & Broadcast (APMG / Broadcast Plus)",
  "Digital Filmmaking (Next Gen 3D Filmmaking)",
  "Broadcast & Graphic Design",
  "UI/UX Design Pro",
  "GEN AI for Creators",
  "Bachelors Degree (University Assoc.)",
];

export const centresByState: Record<string, string[]> = {
  Maharashtra: [
    "Mumbai - Andheri",
    "Mumbai - Dadar",
    "Pune - FC Road",
    "Nagpur",
    "Nashik",
  ],
  "Delhi NCR": ["Delhi - South Ext", "Noida", "Gurugram"],
  Karnataka: ["Bengaluru - Indiranagar", "Bengaluru - Jayanagar", "Mysuru"],
  "West Bengal": ["Kolkata - Salt Lake", "Kolkata - Park Street"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
  "Tamil Nadu": ["Chennai", "Coimbatore"],
  Telangana: ["Hyderabad - Banjara Hills"],
  Rajasthan: ["Jaipur"],
  "Uttar Pradesh": ["Lucknow", "Noida"],
};

export const usps = [
  {
    title: "Industry Game Changers",
    subtitle: "Learn from working artists",
    tone: "crimson",
    icon: "users",
  },
  {
    title: "Studio Exposure",
    subtitle: "Live cases & pipelines",
    tone: "gold",
    icon: "monitor",
  },
  {
    title: "Placement Support",
    subtitle: "Ready from day one",
    tone: "emerald",
    icon: "briefcase",
  },
  {
    title: "Portfolio That Speaks",
    subtitle: "Showreels, not textbooks",
    tone: "blue",
    icon: "award",
  },
  {
    title: "MESC · NSDC · Skill India",
    subtitle: "Nationally recognized",
    tone: "gold",
    icon: "spark",
  },
] as const;

export const affiliatedPlus = [
  { code: "AD3D Edge Plus", track: "3D Animation" },
  { code: "ADVFX Plus", track: "Visual Effects" },
  { code: "APDMC Plus", track: "Digital Content" },
  { code: "ADIDG Plus", track: "Game Design" },
] as const;

export const studios = [
  "DNEG",
  "MPC VFX",
  "Technicolor",
  "Rockstar",
  "Ubisoft",
  "Red Chillies",
  "Prime Focus",
  "Amazon",
  "Accenture",
  "Folks VFX",
  "Pixel Tek",
  "Liminal",
];

export const alumni = [
  {
    name: "Manit Kumar",
    field: "3D Animation Artist",
    salary: "9.9 LPA",
    company: "Sundeep Groups",
    image: "/images/alumni-1.jpg",
  },
  {
    name: "Preethi S",
    field: "3D Animation Artist",
    salary: "8.5 LPA",
    company: "Light and Wonder",
    image: "/images/alumni-2.jpg",
  },
  {
    name: "Shivam Gujran",
    field: "3D Animation Artist",
    salary: "6.6 LPA",
    company: "OpenCV Org",
    image: "/images/alumni-3.jpg",
  },
  {
    name: "Shilpi Gupta",
    field: "Interior Designer",
    salary: "4.92 LPA",
    company: "Livspace",
    image: "/images/alumni-4.jpg",
  },
  {
    name: "Ritika Singh",
    field: "Motion Graphic Artist",
    salary: "4.56 LPA",
    company: "Junglee Games",
    image: "/images/alumni-6.jpg",
  },
  {
    name: "Sanjay Verma",
    field: "3D Modeling Artist",
    salary: "4.2 LPA",
    company: "MH1 Channel",
    image: "/images/alumni-5.jpg",
  },
  {
    name: "Kamna Gautam",
    field: "Graphic Designer",
    salary: "4.3 LPA",
    company: "Touchwood",
    image: "/images/alumni-1.jpg",
  },
  {
    name: "Anamika Porwal",
    field: "Graphic Designer",
    salary: "4.2 LPA",
    company: "Infoedge",
    image: "/images/alumni-2.jpg",
  },
  {
    name: "Gazala Yasmin",
    field: "Graphic Designer",
    salary: "4.2 LPA",
    company: "Niyat Studio",
    image: "/images/alumni-4.jpg",
  },
];

export const events = [
  {
    title: "24FPS Awards",
    tag: "Global Level",
    blurb:
      "India’s top animation award where students showcase work, get expert critiques, and industry exposure.",
    image: "/images/event.jpg",
  },
  {
    title: "MAAC Creative League",
    tag: "Inter-Centre Battle",
    blurb:
      "High-octane internal battle testing design speed under realistic studio deadlines.",
    image: "/images/showreel-1.jpg",
  },
  {
    title: "MAAC Manifest",
    tag: "4-Day Immersive",
    blurb:
      "Workshops, seminars, and studio-like collaboration in Goa or Rann of Kutch.",
    image: "/images/workshop.jpg",
  },
  {
    title: "National Students Meet",
    tag: "Zonal + Industry",
    blurb:
      "Zonal events with alumni programs and industry sessions for real-world job readiness.",
    image: "/images/event.jpg",
  },
  {
    title: "100 Hours",
    tag: "Film Sprint",
    blurb:
      "A high-pressure challenge to make a short film in 100 hours — speed, teamwork, skill.",
    image: "/images/film.jpg",
  },
  {
    title: "MAAC Klick",
    tag: "Photo + Film",
    blurb:
      "Photography and filmmaking contest with expert feedback to sharpen creative craft.",
    image: "/images/camera.jpg",
  },
  {
    title: "BTS — Behind The Screen",
    tag: "Showcasing",
    blurb:
      "A multi-category competition that builds presentation skills and professional confidence.",
    image: "/images/studio.jpg",
  },
  {
    title: "Deadline",
    tag: "Live Webinars",
    blurb:
      "Live sessions by industry pros covering trends, tools, and studio-standard tips.",
    image: "/images/learning.jpg",
  },
];

export const studentWork = [
  { name: "Ritvik Kumar Das", image: "/images/showreel-1.jpg" },
  { name: "Tanuj Dhami", image: "/images/animation.jpg" },
  { name: "Mohik Dhakate", image: "/images/gaming.jpg" },
  { name: "Anjali Kashyap", image: "/images/vfx.jpg" },
  { name: "Chhandosi Mukherjee", image: "/images/motion.jpg" },
  { name: "Ashad Khan", image: "/images/film.jpg" },
  { name: "Deepak Kumar", image: "/images/studio.jpg" },
  { name: "Indranuj Das", image: "/images/showreel-2.jpg" },
  { name: "Saif Alam", image: "/images/content.jpg" },
  { name: "Shravon PP", image: "/images/ux.jpg" },
  { name: "Sasmita Pani", image: "/images/motion.jpg" },
];

export const whyMaac = [
  {
    title: "Learn from Industry Game Changers",
    detail:
      "Faculty and visiting mentors who have shipped work for films, AAA games, and OTT pipelines.",
  },
  {
    title: "Exclusive Studio & Tech Exposure",
    detail:
      "Live case studies, studio-led delivery, and end-to-end production workflows on CareerX tracks.",
  },
  {
    title: "Placement Support Cell",
    detail:
      "Portfolio reviews, interview drills, and hiring drives with 450+ studios including DNEG and Red Chillies.",
  },
  {
    title: "Portfolio That Speaks Volumes",
    detail:
      "Graduation reels, 24FPS submissions, and client-style briefs instead of textbook-only assignments.",
  },
  {
    title: "Future-Built Infrastructure & Rigs",
    detail:
      "Industry-grade workstations, Unreal / Maya / Nuke labs, and camera + laptop schemes for enrolled students.",
  },
];

export const faqs = [
  {
    q: "Can I join MAAC after 10th or 12th?",
    a: "Yes. Several career programs accept students with a 10th or 12th marksheet. Counselors map you to Animation, VFX, Gaming, or Content tracks based on aptitude.",
  },
  {
    q: "How does the Bharat Creator Scholarship work?",
    a: "Merit-based fee waivers go up to 35% for a limited admission window (currently till 31 October 2026). Eligibility is confirmed after a short counseling call.",
  },
  {
    q: "Are MAAC certificates recognized?",
    a: "MAAC is partnered with MESC under the Skill India Mission and offers nationally recognized, industry-relevant training.",
  },
  {
    q: "Do you help with placements?",
    a: "Yes. A dedicated placement cell supports studio-ready students. Alumni work with DNEG, Red Chillies, Amazon, Accenture, Ubisoft hiring partners, and 450+ studios.",
  },
  {
    q: "What is CareerX vs CreatorX?",
    a: "CareerX is studio-aligned (pipelines, live cases, production workflow). CreatorX prepares you for freelance, YouTube, IP, and the gig economy. Several Plus programs are powered by both.",
  },
];

export const quizQuestions = [
  {
    id: "interest",
    prompt: "What lights you up the most?",
    options: [
      { id: "characters", label: "Characters & stories", course: "3D Animation (AD3D Edge Plus)" },
      { id: "vfx", label: "Cinematic VFX & explosions", course: "Visual Effects (ADVFX Plus)" },
      { id: "games", label: "Games & real-time worlds", course: "Game Art & Design (ADIDG Plus)" },
      { id: "youtube", label: "YouTube / short-form content", course: "Digital Content Creation (APDMC Plus)" },
    ],
  },
  {
    id: "path",
    prompt: "How do you want to work after MAAC?",
    options: [
      { id: "studio", label: "Join a film / game studio", course: "careerx" },
      { id: "indie", label: "Freelance or build my own IP", course: "creatorx" },
      { id: "both", label: "Studio now, creator later", course: "both" },
    ],
  },
  {
    id: "edu",
    prompt: "Your current education?",
    options: [
      { id: "tenth", label: "10th completed", course: "ok" },
      { id: "twelfth", label: "12th / diploma", course: "ok" },
      { id: "grad", label: "Graduate or working", course: "ok" },
    ],
  },
] as const;
