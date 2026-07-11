// src/data/portfolioData.js
export const personalInfo = {
  name: "Selvaraj C",
  roles: [
    "MERN Stack Developer",
    "Frontend Developer",
    "React.js Specialist",
    "Full Stack Developer",
    "Problem Solver",
  ],
  location: "Tamil Nadu, India",
  email: "Selvarajcdev@gmail.com",
  phone: "+91 6374821351",
  linkedin: "https://linkedin.com/in/selvarajc",
  github: "https://github.com/selvarajc",
  summary:
    "Motivated MERN Stack Developer with hands-on experience in live client projects, frontend development, backend development, REST APIs, and modern web technologies. Passionate about creating beautiful, responsive, high-performance web applications with clean code and exceptional user experience. Experienced in React.js, Node.js, Express.js, MongoDB, API testing with Postman, and collaborative software development.",
};

export const stats = [
  { label: "Projects Built", value: 10, suffix: "+" },
  { label: "Internships", value: 2, suffix: "" },
  { label: "Technologies", value: 15, suffix: "+" },
  { label: "Certifications", value: 3, suffix: "" },
];

export const skills = {
  Frontend: [
    { name: "HTML5", level: 95, icon: "FaHtml5", color: "#E44D26" },
    { name: "CSS3", level: 90, icon: "FaCss3Alt", color: "#264DE4" },
    { name: "JavaScript", level: 88, icon: "SiJavascript", color: "#F7DF1E" },
    { name: "Bootstrap", level: 85, icon: "FaBootstrap", color: "#7952B3" },
    { name: "React.js", level: 87, icon: "FaReact", color: "#61DAFB" },
  ],
  Backend: [
    { name: "Node.js", level: 82, icon: "FaNodeJs", color: "#339933" },
    { name: "Express.js", level: 80, icon: "SiExpress", color: "#ffffff" },
  ],
  Database: [
    { name: "MongoDB", level: 80, icon: "SiMongodb", color: "#47A248" },
  ],
  Programming: [
    { name: "Python", level: 70, icon: "FaPython", color: "#3776AB" },
    { name: "JavaScript", level: 88, icon: "SiJavascript", color: "#F7DF1E" },
  ],
  Tools: [
    { name: "Git", level: 85, icon: "FaGit", color: "#F05032" },
    { name: "GitHub", level: 87, icon: "FaGithub", color: "#ffffff" },
    { name: "VS Code", level: 92, icon: "VscVscode", color: "#007ACC" },
    { name: "Postman", level: 80, icon: "SiPostman", color: "#FF6C37" },
  ],
  "Core Skills": [
    { name: "Responsive Design", level: 92, icon: "MdDevices", color: "#61DAFB" },
    { name: "REST APIs", level: 83, icon: "TbApi", color: "#3B82F6" },
    { name: "Debugging", level: 85, icon: "MdBugReport", color: "#8B5CF6" },
    { name: "Problem Solving", level: 90, icon: "MdPsychology", color: "#00FFA3" },
    { name: "Team Collaboration", level: 88, icon: "MdGroups", color: "#FFD166" },
  ],
};

export const experience = [
  {
    company: "Carrezza Global Solutions",
    role: "Web Development Intern",
    type: "On-site",
    period: "April 2026 – July 2026",
    location: "Perunduari, Tamil Nadu, India",
    color: "#61DAFB",
    highlights: [
      "Worked on live client projects in a production environment",
      "Contributed to frontend & backend development using MERN Stack",
      "Built and integrated REST APIs tested with Postman",
      "Debugged request/response cycles and resolved integration issues",
      "Followed coding best practices and collaborated with dev team",
      "Adapted quickly to new requirements in a fast-paced environment",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Postman", "REST APIs"],
  },
  {
    company: "IDM Techpark",
    role: "Frontend Developer Intern",
    type: "On-site",
    period: "May 2024 – Jun 2024",
    location: "Erode, Tamil Nadu, India",
    color: "#3B82F6",
    highlights: [
      "Worked on frontend development tasks and UI layouts",
      "Built responsive UI using Bootstrap and React.js",
      "Implemented pixel-perfect responsive design from Figma mockups",
      "Gained hands-on experience in modern web development workflows",
    ],
    tech: ["React.js", "Bootstrap", "HTML5", "CSS3", "JavaScript"],
  },
  {
    company: "IDM Techpark",
    role: "Web Development Bootcamp",
    type: "Training",
    period: "Dec 2024",
    location: "Erode, Tamil Nadu, India",
    color: "#8B5CF6",
    highlights: [
      "Gained hands-on experience in modern web development workflows",
      "Trained in full-stack development",
    ],
    tech: ["Web Development"],
  },
];

export const projects = [
  {
    title: "Doctor Appointment Booking System",
    subtitle: "Full Stack MERN Application",
    description:
      "A complete doctor appointment booking system with authentication, real-time scheduling, rescheduling, and cancellation features. Built with the MERN stack with a responsive dashboard for patients and doctors.",
    image: "/projects/doctor.png",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Bootstrap"],
    github: "https://github.com/selvarajc",
    live: "#",
    color: "#61DAFB",
    features: ["Appointment Booking", "Reschedule & Cancel", "Authentication", "Dashboard", "Responsive UI"],
  },
  {
    title: "Weather App",
    subtitle: "React.js + Weather API",
    description:
      "A real-time weather application with animated weather icons, city search, and beautiful UI. Fetches live data from a weather API and displays current conditions, temperature, humidity, and forecasts.",
    image: "/projects/weather.png",
    tech: ["React.js", "Weather API", "CSS3", "Framer Motion"],
    github: "https://github.com/selvarajc",
    live: "#",
    color: "#3B82F6",
    features: ["Real-time Weather", "City Search", "Animated Icons", "Responsive Design"],
  },
  {
    title: "Resume Builder",
    subtitle: "React.js Interactive App",
    description:
      "An interactive resume builder with dynamic templates, live preview, and PDF generation. Users can fill in their details, choose a template, and download a professional resume instantly.",
    image: "/projects/resume.png",
    tech: ["React.js", "JavaScript", "CSS3", "PDF Generation"],
    github: "https://github.com/selvarajc",
    live: "#",
    color: "#8B5CF6",
    features: ["Dynamic Templates", "Live Preview", "PDF Export", "Modern UI"],
  },
];

export const education = [
  {
    degree: "B.Sc Computer Science",
    institution: "Sengunthar Arts and Science College",
    period: "2022 – 2025",
    location: "Thiruchengode, Tamil Nadu",
    icon: "FaGraduationCap",
    color: "#61DAFB",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Government Boys Higher Secondary School",
    period: "2021 – 2022",
    location: "Pallipalayam, Tamil Nadu",
    icon: "FaBook",
    color: "#3B82F6",
  },
  {
    degree: "Secondary School Leaving Certificate (SSLC)",
    institution: "Government Boys Higher Secondary School",
    period: "2019 – 2020",
    location: "Pallipalayam, Tamil Nadu",
    icon: "FaUniversity",
    color: "#8B5CF6",
  },
];

export const certifications = [
  {
    title: "MERN Stack Development",
    issuer: "IDM Tech Institutions",
    period: "Jan – Jun 2025",
    color: "#61DAFB",
    icon: "FaCertificate",
  },
  {
    title: "Communication & Personal Dynamics",
    issuer: "Magic Bus India Foundation",
    period: "Jan 2025",
    color: "#3B82F6",
    icon: "FaStar",
  },
  {
    title: "Problem Solving & Process Control",
    issuer: "Magic Bus India Foundation",
    period: "Jan 2025",
    color: "#8B5CF6",
    icon: "FaPuzzlePiece",
  },
];

export const techIcons = [
  { icon: "FaReact", name: "React", color: "#61DAFB" },
  { icon: "FaNodeJs", name: "Node.js", color: "#339933" },
  { icon: "SiMongodb", name: "MongoDB", color: "#47A248" },
  { icon: "SiExpress", name: "Express", color: "#ffffff" },
  { icon: "FaGitAlt", name: "Git", color: "#F05032" },
  { icon: "SiJavascript", name: "JS", color: "#F7DF1E" },
  { icon: "FaHtml5", name: "HTML5", color: "#E44D26" },
  { icon: "FaCss3Alt", name: "CSS3", color: "#264DE4" },
];
