export const portfolioData = {
  about: {
    bio: "Hi my name is Brandon! I'm currently studying at the University of Toronto. I'm a passionate software developer with a passion for building innovative solutions to real-world problems.",
    interests: [
      "Full-Stack Development",
      "Artificial Intelligence",
      "UI/UX Design",
      "Cloud Computing",
      "Open Source"
    ]
  },
  
  skills: {
   "Languages": [
  { "name": "JavaScript", "icon": "⚡", "proficiency": 90 },
  { "name": "Python", "icon": "🐍", "proficiency": 85 },
  { "name": "Java", "icon": "☕", "proficiency": 80 },
  { "name": "C", "icon": "⚙️", "proficiency": 75 },
  { "name": "Kotlin", "icon": "android", "proficiency": 0 },
  { "name": "TypeScript", "icon": "", "proficiency": 0 },
  { "name": "Lua", "icon": "", "proficiency": 0 },
  { "name": "PHP", "icon": "", "proficiency": 0 },
  { "name": "SQL", "icon": "server", "proficiency": 0 }
],
"Frameworks & Libraries": [
  { "name": "React", icon: "⚛️", proficiency: 90 },
  { "name": "Node.js", icon: "🟢", proficiency: 85 },
  { "name": "Express.js", icon: "🚀", proficiency: 80 },
  { "name": "Vue.js", icon: "", proficiency: 75 }
],
   "Tools & Technologies": [
  { "name": "Git", icon: "🔄", proficiency: 90 },
  { "name": "Docker", icon: "🐳", proficiency: 80 },
  { "name": "AWS", icon: "☁️", proficiency: 75 },
  { "name": "MongoDB", icon: "🗃️", proficiency: 85 },
  { "name": "Postman", icon: "📨", proficiency: 85 },
  { "name": "Render", icon: "📡", proficiency: 70 },
  { "name": "Firebase", icon: "🔥", proficiency: 80 },
  { "name": "Bash", icon: "", proficiency: 80 }
]
  },
  
  experience: [
    {
      company: "Sentri AI",
      role: "Software Engineer Intern",
      date: "May 2025 - Present",
      achievements: [
        "Developed and optimized LLM-driven workflows using LangChain , improving automation of security compliance tasks for clients.",
        "Built full-stack features with React , Next.js , Python , and FastAPI , delivering scalable frontend interfaces and backend services.",
      ]
    },
    {
      company: "Stryde Health",
      role: "Full Stack Software Engineer",
      date: "May 2025 - Present",
      achievements: [
        "Built Stryde's iPadOS patient app in Swift , integrating test and sensor data into a secure AWS backend using Node.js , Express , and MongoDB .",
        "Developed a React dashboard for clinicians with REST APIs and real-time data sync to support stroke recovery tracking and decisions.",

      ]
    },
    {
      company: "UofT Blueprint",
      role: "Full Stack Software Engineer",
      date: "September 2024 - April 2025",
      achievements: [
        "Developed and deployed a Kotlin-based Android menstrual tracker (200+ users) with cycle prediction and daily notifications using Jetpack libraries.",
        "Integrated Firebase Realtime Database for secure cloud storage and collaborated with a 12-person team using MVVM, GitHub Projects, and code reviews for scalability.",
      ]
    },
    {
      company: "FIRST Robotics Compeition Team 7558",
      role: "Lead Software Engineer",
      date: "September 2022 - June 2024",
      achievements: [
        "Developed a full-stack data analytics app using MongoDB , Express.js , Vue.js , and Node.js to analyze robot performance, supporting 150+ users during competitions.",
        "Leveraged Postman for API testing and Git for version control to ensure efficient collaboration, deployment, and application reliability.",
      ]
    },

      {
      company: "Qvella",
      role: "Supply Chain Management Intern",
      date: "June 2023 - August 2023",
      achievements: [
        " Helped create and analyze Bill of Materials with Microsoft Excel, streamlining data management and improving procurement efficiency.",
        "Performed routine warehouse inventory audits to ensure accurate purchasing from each supplier, optimizing parts procurement and minimizing excess stock.",
      ]
    }
  ],
  
  projects: [
    {
      name: "Qnect",
      description: "An AI powered blind dating app that uses LLMs to match users based on interests and preferences.",
      techStack: ["Vue.js", "Node.js", "MongoDB", "Express.js", "Groq LLM API", "Imentiv API"],
      githubLink: "https://github.com/fredh2006/qnect",
      demoLink: "https://www.youtube.com/watch?v=k2-dmvFxZMg",
      imagePath: "/public/qnect.png"
    },
    {
      name: "Vortex AI",
      description: "A mobile AI app that combines language and image models into one easy to use mobile application. Utilizes the Groq API and StableDiffusion API.",
      techStack: ["React Native", "ExpoGo", "Groq LLM API", "StableDiffusion API"],
      githubLink: "https://github.com/BrandonT310442/VortexAI2",
      imagePath: "/public/Vortex4.png"
    },
    {
      name: "FRC Data Analytics App",
      description: "A app designed for the FRC 2024 Crescendo Season that analyzes robot performance data to help teams make strategic alliance selections.",
      techStack: ["Vue.js", "Express", "MongoDB", "Node.js"],
      demoLink: "https://crescendoscoutingapp.onrender.com/",
      imagePath: "/public/FRC.png"
    },
    {
      name: "Vendoza Marketplace",
      description: "An online marketplace application that allows users to purchase and sell items. Includes a built in chat system and authentication for users using Passsport.js.",
      techStack: ["Passport.js", "Vue.js", "Express.js", "MongoDB","Node.js"],
      githubLink: "https://github.com/RayhanMamdani/WebStackApp",
      imagePath: "/public/Vendoza.png"
    },
        {
      name: "NBA Sports Stats App",
      description: "NBA web application that stored and retrieved live NBA stats. Includes NBA News via the RSS imageboard. Statistics were updated every day for 2022-2023 NBA Season, using the NBA API.",
      techStack: ["HTML", "CSS", "JavaScript", "Bulma","NBA API"],
      githubLink: "https://github.com/BrandonT310442/ICS4U-2022-23/tree/main/Introduction%20to%20Javascript/Sports%20Stats%20Project",
      imagePath: "/public/NBA.png"
    }
  ]
};