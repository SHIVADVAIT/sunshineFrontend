import React from 'react';
import { useNavigate } from 'react-router-dom';
import KiranMedicalOne from '../../assets/Product/ProjectOne/KiranMedical.png';
import KiranMedicalTwo from '../../assets/Product/ProjectOne/KiranMedicalRoadCurving.png';
import KiranMedicalThree from '../../assets/Product/ProjectOne/KiranMedicalCollege.png';

export default function ProjectOne() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const projectDetails = {
    name: "Kiran Medical Hospital",
    client: "Samast Patidar Arogya Trust",
    location: "Vadod, Surat",
    quantities: [
      { item: "Pavers", quantity: "10000+ sq mtrs" },
      { item: "Kerbs", quantity: "600+ nos." }
    ],
    description: "A comprehensive infrastructure development project for Kiran Medical Hospital, featuring extensive paver block installation and kerb stone placement to enhance the medical facility's accessibility and aesthetics.",
    challenges: [
      "Large-scale paver installation over 10,000+ sq mtrs",
      "Precision kerb placement for proper drainage",
      "Maintaining hospital operations during construction",
      "Ensuring accessibility compliance for medical facility"
    ],
    solutions: [
      "Phased construction approach to minimize disruption",
      "High-quality concrete pavers for durability",
      "Professional kerb installation for water management",
      "Timely project completion within schedule"
    ]
  };

  const projectImages = [
    { src: KiranMedicalOne, alt: "Kiran Medical Hospital - Main View", title: "Hospital Main Entrance" },
    { src: KiranMedicalTwo, alt: "Kiran Medical Hospital - Road Curving", title: "Curved Road Section" },
    { src: KiranMedicalThree, alt: "Kiran Medical Hospital - College Area", title: "College Campus Area" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3">
          <nav className="text-xs sm:text-sm text-gray-500">
 <button onClick={() => navigate('/')} className="hover:text-red-400 transition-colors">
              Home
            </button>            <span className="mx-1 sm:mx-2">/</span>
            <span>Projects</span>
            <span className="mx-1 sm:mx-2">/</span>
            <span className="text-red-400 font-medium">Kiran Medical Hospital</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-400 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-4 lg:py-6">
          <div className="text-center">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4">
              Kiran Medical Hospital Project
            </h1>
            <p className="text-xs sm:text-sm text-red-100 max-w-4xl mx-auto leading-relaxed">
              {projectDetails.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          
          {/* Main Content - Project Details */}
          <div className="lg:col-span-3">
            
            {/* Project Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 border-b border-gray-200 pb-2 sm:pb-3">
                Project Overview
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">Project Name</h3>
                    <p className="text-xs sm:text-sm text-gray-700">{projectDetails.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">Client</h3>
                    <p className="text-xs sm:text-sm text-gray-700">{projectDetails.client}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">Location</h3>
                    <p className="text-xs sm:text-sm text-gray-700">{projectDetails.location}</p>
                  </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">Approximate Quantities</h3>
                    <div className="space-y-2">
                      {projectDetails.quantities.map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-50 p-2 sm:p-3 rounded-lg">
                          <span className="text-xs sm:text-sm font-medium text-gray-900">{item.item}:</span>
                          <span className="text-xs sm:text-sm text-red-400 font-semibold">{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Gallery */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 border-b border-gray-200 pb-2 sm:pb-3">
                Project Gallery
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {projectImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-w-4 aspect-h-3 bg-gray-100 rounded-xl overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-xs sm:text-sm font-semibold text-white">{image.title}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges & Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              
              {/* Challenges */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 border-b border-gray-200 pb-2 sm:pb-3">
                  Project Challenges
                </h2>
                
                <div className="space-y-3 sm:space-y-4">
                  {projectDetails.challenges.map((challenge, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{challenge}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 border-b border-gray-200 pb-2 sm:pb-3">
                  Our Solutions
                </h2>
                
                <div className="space-y-3 sm:space-y-4">
                  {projectDetails.solutions.map((solution, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{solution}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Project Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 sticky top-20">
              
              {/* Quick Info */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 border-b border-gray-200 pb-2 sm:pb-3">
                  Quick Info
                </h3>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">Project Type</h4>
                    <p className="text-xs sm:text-sm text-gray-700">Medical Infrastructure</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">Scope</h4>
                    <p className="text-xs sm:text-sm text-gray-700">Paving & Kerb Installation</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">Status</h4>
                    <span className="inline-block bg-green-100 text-green-800 text-xs sm:text-sm font-semibold px-2 py-1 rounded-full">
                      Completed
                    </span>
                  </div>
                </div>
              </div>

              {/* Related Projects */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 border-b border-gray-200 pb-2 sm:pb-3">
                  Other Projects
                </h3>
                
                <div className="space-y-2 sm:space-y-3">
                  {[
                    { name: "Commercial Complex", type: "Commercial" },
                    { name: "Residential Society", type: "Residential" },
                    { name: "Industrial Park", type: "Industrial" }
                  ].map((project, index) => (
                    <div key={index} className="group">
                      <button 
                        onClick={() => handleNavigation('/projects')}
                        className="w-full text-left p-2 sm:p-3 rounded-lg transition-all duration-300 border bg-gray-50 border-gray-200 text-gray-700 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs sm:text-sm font-medium">{project.name}</span>
                            <p className="text-xs sm:text-sm text-gray-500">{project.type}</p>
                          </div>
                          <svg 
                            className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 text-gray-400 group-hover:text-red-500" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact for Similar Projects */}
              <div className="pt-4 sm:pt-6 border-t border-gray-200">
                <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3 sm:mb-4">
                  Interested in Similar Project?
                </h4>
                <button 
                  onClick={() => handleNavigation('/contact')}
                  className="w-full bg-red-400 hover:bg-red-500 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold text-xs sm:text-sm transition-colors duration-300"
                >
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-400 to-red-500 text-white py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 text-center">
          <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xs sm:text-sm text-red-100 mb-4 sm:mb-6 max-w-3xl mx-auto">
            Contact SunShine EnterPrises today for professional paving and infrastructure solutions for your medical, commercial, or residential projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <button 
              onClick={() => handleNavigation('/contact')}
              className="bg-white text-red-500 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm hover:bg-red-50 transition-colors duration-300 w-full sm:w-auto"
            >
              Get Quote Now
            </button>
            <button 
              onClick={() => handleNavigation('/projects')}
              className="border-2 border-white text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm hover:bg-white hover:text-red-500 transition-colors duration-300 w-full sm:w-auto"
            >
              View More Projects
            </button>
          </div>
        </div>
      </div>

     </div>
  );
}
