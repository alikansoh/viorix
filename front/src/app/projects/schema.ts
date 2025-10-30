export interface TechStack {
    name: string;
    icon: string;
    category: string;
    description?: string;
  }
  
  export interface Project {
    link: string | undefined;
    alt: string;
    id: number;
    title: string;
    subtitle: string;
    description: string;
    longDescription: string;
    image: string;
    images: string[];
    client: string;
    duration: string;
    year: string;
    category: string;
    tags: string[];
    technologies: string[];
    status: string;
    featured: boolean;
    liveUrl?: string;
    githubUrl?: string;
  }
  
  
  export interface Stat {
    number: string;
    label: string;
    icon: string;
  }
  
  export interface ProjectFilters {
    searchTerm: string;
    activeFilter: string;
    viewMode: 'grid' | 'list';
  }