"use client"
import React, { useState, useEffect } from 'react';
import { Search, Grid, List, X, ChevronLeft, ChevronRight, Eye, ExternalLink } from 'lucide-react';
import { expandedTechStack, projects, stats } from './portfolioData';
import { Project, TechStack } from './schema';

const ProjectsPortfolio: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [selectedTechCategory, setSelectedTechCategory] = useState<string>('Frontend');
  const [showAllTech, setShowAllTech] = useState<boolean>(false);

  const categories = ['All', 'Mobile Application', 'Websites', 'UI/UX'];
  const techCategories = ['Frontend', 'Backend', 'Mobile', 'Database', 'DevOps', 'Design'];

  // Filter projects based on search and category
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeFilter === 'All' || project.category === activeFilter;
    return matchesSearch && matchesCategory;
  });

  // Filter tech stack by category
  const filteredTechStack = expandedTechStack.filter(tech => tech.category === selectedTechCategory);
  const displayedTech = showAllTech ? filteredTechStack : filteredTechStack.slice(0, 8);

  // Initialize visibility animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle modal close on ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const nextImage = () => {
    if (selectedProject && selectedProject.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject && selectedProject.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  // Function to navigate to project page
  const navigateToProject = (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    if (project?.liveUrl) {
      window.open(project.liveUrl, '_blank');
    } else {
      // Fallback for projects without liveUrl
      alert(`Project URL not available for: ${project?.title}`);
    }
  };

  const TechIcon: React.FC<{ tech: TechStack; index: number }> = ({ tech, index }) => (
    <div
      key={tech.name}
      className="group relative bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-100/50 shadow-sm hover:shadow-md transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 text-center"
      style={{ transitionDelay: `${index * 30}ms` }}
      data-testid={`tech-${tech.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
    >
      <div className="w-12 h-12 mx-auto mb-3 p-2 bg-gradient-to-br from-blue-50/30 to-indigo-50/20 rounded-lg group-hover:from-[#00BFFF]/10 group-hover:to-[#1B365D]/10 transition-all duration-300 flex items-center justify-center">
        <img
          src={tech.icon}
          alt={tech.name}
          className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
      <h4 className="font-semibold text-[#1B365D] text-xs group-hover:text-[#00BFFF] transition-colors duration-300">
        {tech.name}
      </h4>
      
      {/* Hover tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#1B365D] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20">
        {tech.description || tech.name}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#1B365D]"></div>
      </div>
    </div>
  );

  const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <article
      className={`group relative bg-white/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-500 border border-blue-100/50 cursor-pointer ${
        viewMode === 'list' ? 'md:flex md:items-center' : ''
      }`}
      onMouseEnter={() => setHoveredProject(project.id)}
      onMouseLeave={() => setHoveredProject(null)}
      onClick={() => navigateToProject(project.id)}
      data-testid={`project-card-${project.id}`}
    >
      {/* Project Image */}
      <div className={`relative overflow-hidden ${
        viewMode === 'list' ? 'md:w-2/5 h-80' : 'h-80'
      }`}>
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-contain transition-all duration-1000 ${
            hoveredProject === project.id ? 'scale-105 brightness-110' : 'scale-100'
          }`}
        />
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-all duration-500 ${
          hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex gap-3">
              <div className="flex-1 px-4 py-3 bg-white/90 backdrop-blur-sm rounded-2xl text-[#1B365D] font-bold hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Visit Live Site
              </div>
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="absolute top-6 right-6 z-10">
          <div className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white text-sm font-bold rounded-full shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            {project.status}
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className={`p-8 flex-1 ${viewMode === 'list' ? 'md:w-3/5' : ''}`}>
        {/* Project Meta Information */}
        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/90 text-[#1B365D] rounded-lg font-semibold border border-blue-100/50 shadow-sm">
            <span>👤</span>
            {project.client}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/90 text-[#1B365D] rounded-lg font-semibold border border-blue-100/50 shadow-sm">
            <span>📅</span>
            {project.status}
          </div>
        </div>

        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 border border-blue-100/50 text-[#1B365D] text-sm font-bold rounded-lg shadow-sm">
            <span>🎯</span>
            {project.category}
          </span>
        </div>

        {/* Title and Description */}
        <div className="mb-6">
          <h3 className="text-2xl font-black text-[#1B365D] mb-2 group-hover:text-[#00BFFF] transition-colors duration-300 leading-tight">
            {project.title}
          </h3>
          <p className="text-lg font-semibold text-[#00BFFF] mb-3">
            {project.subtitle}
          </p>
          <p className="text-gray-600 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Technologies - Professional compact display */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-[#1B365D] mb-3">Tech Stack:</h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 6).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-3 py-2 bg-white/90 border border-blue-100/50 text-[#1B365D] text-sm rounded-lg font-medium hover:bg-blue-50/30 transition-all duration-200 shadow-sm"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 6 && (
              <button className="px-3 py-2 bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 border border-blue-200/50 text-[#00BFFF] text-sm rounded-lg font-semibold hover:from-[#00BFFF]/20 hover:to-[#1B365D]/20 transition-all duration-200">
                +{project.tags.length - 6} more
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-4">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigateToProject(project.id);
            }}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            data-testid={`explore-project-${project.id}`}
          >
            <ExternalLink className="w-5 h-5" />
            View Live Site
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProject(project);
              setCurrentImageIndex(0);
            }}
            className="px-6 py-3 bg-white border-2 border-[#00BFFF] text-[#00BFFF] font-semibold rounded-lg hover:bg-gradient-to-r hover:from-[#00BFFF] hover:to-[#1B365D] hover:text-white transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-sm"
            data-testid={`quick-view-${project.id}`}
          >
            <Eye className="w-5 h-5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#00BFFF] via-blue-500 to-[#1B365D] rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-500 -z-10"></div>
    </article>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-[#00BFFF]/20 to-[#1B365D]/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-gradient-to-r from-[#1B365D]/20 to-[#00BFFF]/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <header className={`pt-20 pb-16 text-center transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/70 backdrop-blur-lg border border-blue-200/50 rounded-full text-sm font-semibold text-[#1B365D] mb-8 shadow-lg">
            <div className="w-2 h-2 bg-[#00BFFF] rounded-full animate-ping"></div>
            <span>Portfolio Showcase</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-[#00BFFF] to-[#1B365D] bg-clip-text text-transparent">Our Amazing</span>
            <br />
            <span className="text-[#1B365D]">Projects</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Discover our cutting-edge solutions that transform ideas into 
            <span className="font-bold bg-gradient-to-r from-[#00BFFF] to-[#1B365D] bg-clip-text text-transparent"> extraordinary digital experiences</span>
          </p>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="group" data-testid={`stat-${index}`}>
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-blue-100/50 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-black text-[#1B365D] mb-1">{stat.number}</div>
                  <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* Enhanced Technologies Section */}
        <section className={`mb-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '200ms' }}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-[#1B365D] mb-6">
              Technologies We
              <span className="bg-gradient-to-r from-[#00BFFF] to-[#1B365D] bg-clip-text text-transparent"> Master</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We leverage the latest and most powerful technologies to build scalable, performant, and beautiful applications
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-blue-100/50 shadow-lg">
            {/* Technology Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {techCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedTechCategory(category);
                    setShowAllTech(false);
                  }}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                    selectedTechCategory === category
                      ? 'bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white shadow-lg'
                      : 'bg-white/80 text-[#1B365D] border border-blue-200/50 hover:border-[#00BFFF] hover:shadow-sm'
                  }`}
                  data-testid={`tech-category-filter-${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Technology Grid */}
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-6">
              {displayedTech.map((tech, index) => (
                <TechIcon key={tech.name} tech={tech} index={index} />
              ))}
            </div>

            {/* See More/Less Button */}
            {filteredTechStack.length > 8 && (
              <div className="text-center">
                <button
                  onClick={() => setShowAllTech(!showAllTech)}
                  className="px-6 py-3 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  {showAllTech ? 'Show Less' : `See More (${filteredTechStack.length - 8} more)`}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Enhanced Filter and Search Section */}
        <section className={`mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '400ms' }}>
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-blue-100/50 shadow-lg">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:border-[#00BFFF] focus:outline-none transition-all duration-300 text-[#1B365D] placeholder-gray-400 shadow-sm"
                  data-testid="search-input"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 p-1 bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white shadow-sm' 
                      : 'text-[#1B365D] hover:bg-blue-200/50'
                  }`}
                  data-testid="grid-view-button"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white shadow-sm' 
                      : 'text-[#1B365D] hover:bg-blue-200/50'
                  }`}
                  data-testid="list-view-button"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Enhanced Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                    activeFilter === category
                      ? 'bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white shadow-lg'
                      : 'bg-white/80 text-[#1B365D] border border-blue-200/50 hover:border-[#00BFFF] hover:shadow-sm'
                  }`}
                  data-testid={`category-filter-${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Projects Grid */}
        <section className={`mb-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '600ms' }}>
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Enhanced Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20" data-testid="empty-state">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 rounded-full flex items-center justify-center shadow-2xl">
                <Search className="w-16 h-16 text-[#00BFFF]" />
              </div>
              <h3 className="text-3xl font-black text-[#1B365D] mb-4">No Projects Found</h3>
              <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                We couldn&apos;t find any projects matching your criteria. Try adjusting your search or filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilter('All');
                }}
                className="px-8 py-4 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform"
                data-testid="clear-filters-button"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </section>

        {/* Enhanced Call to Action - Clean Background */}
        <section className={`text-center py-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#00BFFF]/10 via-blue-500/10 to-[#1B365D]/10 rounded-3xl p-16 border-2 border-blue-100/50 backdrop-blur-lg shadow-3xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-black text-[#1B365D] mb-6">
                Ready to Create
                <br />
                <span className="bg-gradient-to-r from-[#00BFFF] to-[#1B365D] bg-clip-text text-transparent">
                  Something Amazing?
                </span>
              </h2>
              <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join our growing list of satisfied clients and let&apos;s transform your vision into an extraordinary digital experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                <button className="px-12 py-6 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 transform flex items-center gap-3 text-lg" data-testid="start-project-button">
                  <span>Start Your Project</span>
                  <ChevronRight className="w-6 h-6" />
                </button>
                <button className="px-12 py-6 bg-white/80 backdrop-blur-sm border-3 border-[#00BFFF]/30 text-[#00BFFF] font-bold rounded-full hover:bg-white hover:border-[#00BFFF] hover:shadow-2xl transition-all duration-300 hover:scale-110 transform text-lg" data-testid="case-studies-button">
                  View Case Studies
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Enhanced Project Modal - Quick View Only */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex items-center justify-center p-4 animate-in fade-in duration-300" data-testid="project-modal">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in duration-500 border border-blue-100/50">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-blue-100/50 bg-gradient-to-r from-blue-50/30 to-indigo-50/20">
              <div>
                <h2 className="text-2xl font-bold text-[#1B365D]">{selectedProject.title}</h2>
                <p className="text-lg font-semibold text-[#00BFFF]">{selectedProject.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-3 hover:bg-red-100 rounded-lg transition-all duration-200 text-gray-600 hover:text-red-600 hover:scale-110"
                data-testid="close-modal-button"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
              {/* Image Gallery */}
              <div className="relative h-80 bg-gradient-to-br from-blue-50/30 to-indigo-50/20 flex items-center justify-center">
                <img
                  src={selectedProject.images[currentImageIndex]}
                  alt={selectedProject.title}
                  className="max-w-full max-h-full object-contain"
                />
                
                {/* Image Navigation */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl hover:scale-125 transition-all duration-300 text-[#1B365D]"
                      data-testid="prev-image-button"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl hover:scale-125 transition-all duration-300 text-[#1B365D]"
                      data-testid="next-image-button"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    
                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {selectedProject.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                              ? 'bg-white shadow-lg scale-125'
                              : 'bg-white/50 hover:bg-white/80'
                          }`}
                          data-testid={`image-indicator-${index}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Project Details */}
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#1B365D] mb-3">Project Overview</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {selectedProject.longDescription}
                  </p>
                  
                  {/* Project Meta */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#1B365D]">Client:</span>
                      <span className="text-gray-600">{selectedProject.client}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#1B365D]">Status:</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold">
                        {selectedProject.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#1B365D]">Category:</span>
                      <span className="text-gray-600">{selectedProject.category}</span>
                    </div>
                  </div>
                </div>
                
                {/* Technologies */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#1B365D] mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.slice(0, 8).map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/90 border border-blue-100/50 text-[#1B365D] rounded-lg font-medium text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {selectedProject.technologies.length > 8 && (
                      <span className="px-3 py-1 bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 border border-blue-200/50 text-[#00BFFF] rounded-lg font-semibold text-sm">
                        +{selectedProject.technologies.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-blue-100/50">
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      const project = projects.find(p => p.id === selectedProject.id);
                      if (project?.liveUrl) {
                        window.open(project.liveUrl, '_blank');
                      }
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                    data-testid="modal-view-project-button"
                  >
                    <ExternalLink className="w-5 h-5" />
                    View Live Project
                  </button>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 px-6 py-3 bg-white border border-blue-300/50 text-[#1B365D] font-semibold rounded-lg hover:bg-blue-50/30 hover:border-[#00BFFF] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                    data-testid="modal-close-button"
                  >
                    <X className="w-5 h-5" />
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPortfolio;