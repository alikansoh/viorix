import { TechStack, Project, Stat } from './schema';

export const expandedTechStack: TechStack[] = [
  // Frontend Frameworks
  { 
    name: 'React', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', 
    category: 'Frontend',
    description: 'A JavaScript library for building user interfaces'
  },
  { 
    name: 'Next.js', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', 
    category: 'Frontend' 
  },
  { 
    name: 'Vue.js', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg', 
    category: 'Frontend' 
  },
  { 
    name: 'Angular', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg', 
    category: 'Frontend' 
  },
  { 
    name: 'Svelte', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg', 
    category: 'Frontend' 
  },
  
  // Backend Frameworks & Languages
  { 
    name: 'Node.js', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', 
    category: 'Backend' 
  },
  { 
    name: 'Laravel', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg', 
    category: 'Backend' 
  },
  { 
    name: 'Django', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg', 
    category: 'Backend' 
  },
  { 
    name: 'Spring Boot', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg', 
    category: 'Backend' 
  },
  { 
    name: 'Express.js', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', 
    category: 'Backend' 
  },
  { 
    name: 'FastAPI', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg', 
    category: 'Backend' 
  },
  
  // Programming Languages
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', category: 'Languages' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', category: 'Languages' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', category: 'Languages' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', category: 'Languages' },
  { name: 'Swift', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg', category: 'Languages' },
  { name: 'Kotlin', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg', category: 'Languages' },
  { name: 'Go', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg', category: 'Languages' },
  { name: 'Rust', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg', category: 'Languages' },
  { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg', category: 'Languages' },
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg', category: 'Languages' },

  // Mobile Development
  { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg', category: 'Mobile' },
  { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', category: 'Mobile' },
  { name: 'Xamarin', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xamarin/xamarin-original.svg', category: 'Mobile' },
  { name: 'Ionic', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ionic/ionic-original.svg', category: 'Mobile' },
  { name: 'Dart', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg', category: 'Mobile' },
  { name: 'Objective-C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/objectivec/objectivec-plain.svg', category: 'Mobile' },
  { name: 'Java (Android)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', category: 'Mobile' },

  // Databases
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', category: 'Database' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', category: 'Database' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', category: 'Database' },
  { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg', category: 'Database' },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg', category: 'Database' },
  { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg', category: 'Database' },

  // Cloud & DevOps
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', category: 'Cloud' },
  { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg', category: 'Cloud' },
  { name: 'Google Cloud', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg', category: 'Cloud' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', category: 'DevOps' },
  { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg', category: 'DevOps' },
  { name: 'Jenkins', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg', category: 'DevOps' },
  { name: 'GitHub Actions', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', category: 'DevOps' },
  { name: 'Terraform', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg', category: 'DevOps' },

  // AI / ML Frameworks
  { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg', category: 'AI/ML' },
  { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg', category: 'AI/ML' },
  { name: 'Scikit-learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikit-learn/scikit-learn-original.svg', category: 'AI/ML' },

  // Design & Tools
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', category: 'Design' },
  { name: 'Adobe XD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xd/xd-original.svg', category: 'Design' },
  { name: 'Sketch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sketch/sketch-original.svg', category: 'Design' },
  { name: 'Photoshop', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg', category: 'Design' }
];


export const projects: Project[] = [
  {
    id: 1,
    title: "JRS Building Contractors",
    subtitle: "Construction & Renovation Website",
    description: "A modern website with a secure CMS to manage building projects.",
    longDescription:
      "We built a responsive website for JRS Building Contractors in the UK. My main focus was creating a secure CMS so the client can easily add and update projects. I used Next.js with MongoDB for the backend, ensuring fast performance, SEO optimisation, and a clean admin dashboard for content management.",
    image: "/jrs.png", 
    images: ["/jrs.png"],
    client: "JRS Building Contractors",
    duration: "2 months",
    year: "2025",
    category: "Webistes",
    tags: ["Next.js", "MongoDB", "TypeScript", "Tailwind CSS"],
    technologies: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
    status: "Live",
    featured: true,
    liveUrl: "https://jrs-building.co.uk"
  },
  {
    id: 2,
    title: "ColdFix",
    subtitle: "Refrigeration & Cooling Services Website",
    description: "A responsive website with a clean UI for a UK service provider.",
    longDescription:
      "We developed the website for ColdFix, a refrigeration and cooling service provider in the UK. I designed the site to be fully responsive and easy to navigate, with a strong focus on clear service presentation and professional branding. I used Next.js with Tailwind CSS for a fast, modern UI.",
    image: "/coldfix.png",
    images: ["/coldfix.png"],
    client: "ColdFix",
    duration: "1 month",
    year: "2025",
    category: "Websites",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
    status: "Live",
    featured: true,
    liveUrl: "https://coldfix.co.uk"
  },
   {
  id: 6,
  title: "Hermeco",
  subtitle: "Construction & Industrial Services Website",
  description: "A modern website with a CMS for managing construction and industrial projects.",
  longDescription:
    "We built a responsive website for Hermeco, a UK-based construction and industrial services company. The main focus was creating a secure CMS so the client can easily manage and update project portfolios. The site was developed with Next.js and MongoDB, ensuring fast performance, SEO optimisation, and a professional admin dashboard for content management.",
  image: "/hermeco.png",
  images: ["/hermeco.png"],
  client: "Hermeco",
  duration: "1 months",
  year: "2025",
  category: "Websites",
  tags: ["Next.js", "MongoDB", "TypeScript", "Tailwind CSS"],
  technologies: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
  status: "Live",
  featured: true,
  liveUrl: "https://hermeco.co.uk"
},
  {
    id: 3,
    title: "360 Drive Academy",
    subtitle: "Driving School Management Website",
    description: "A CMS-powered platform to manage courses and students.",
    longDescription:
      "We created a full platform for 360 Drive Academy to help them manage courses and students. The site includes a CMS for administrators, allowing them to update course details and student records. It was built using React, Express.js, and Node.js, with MongoDB handling the data storage.",
    image: "/360.png",
    images: ["360.png"],
    client: "360 Drive Academy",
    duration: "3 months",
    year: "2024",
    category: "Websites",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "React"],
    technologies: ["React", "Express.js", "Node.js", "MongoDB"],
    status: "Live",
    featured: true,
    liveUrl: "https://360driveacademy.co.uk"
  },
  {
    id: 4,
    title: "Mash & Smash Restaurant",
    subtitle: "Restaurant Menu & Ordering System",
    description: "An interactive menu and food ordering system for a local restaurant.",
    longDescription:
      "We built a restaurant website for Mash & Smash that includes a digital menu, online ordering, and a simple order tracking system. The focus was on making the customer journey quick and easy while giving the restaurant team a way to handle orders efficiently.",
    image: "/mash.png", 
    images: ["/mash.png"],
    client: "Mash & Smash",
    duration: "2 months",
    year: "2024",
    category: "Webistes",
    tags: [ "Ordering System"],
    technologies: [],
    status: "Live",
    liveUrl: "https://www.foodbooking.com/ordering/restaurant/menu?restaurant_uid=066b68c1-e2b1-432a-9fc9-47ee48b74659&dine_in=true&dine_in_subtype=dine_ink",
    featured: false
  },
  {
    id: 5,
    title: "HopeBTC Training Centre",
    subtitle: "Training Website for F-Gas Certification",
    description: "A professional website for a UK training provider.",
    longDescription:
      "We developed a website for HopeBTC, a training centre that provides F-Gas certification. The site has a clean design and clear course information layout, with a focus on accessibility and modern styling. It was built with Next.js and Tailwind CSS to deliver speed, mobile responsiveness, and good SEO.",
    image: "/hope.png",
    images: ["/hope.png"],
    client: "HopeBTC",
    duration: "1 month",
    year: "2024",
    category: "Websites",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", ],
    technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
    status: "Live",
    featured: true,
    liveUrl: "https://hopebtc.co.uk"
  },
 

];

export const stats: Stat[] = [
  { number: "3 years+", label: "Experience", icon: "🚀" },
  { number: "99%", label: "Client Satisfaction", icon: "⭐" },
  { number: "10+", label: "Technologies Mastered", icon: "💻" },
  { number: "24/7", label: "Support Availability", icon: "🕒" }
];

