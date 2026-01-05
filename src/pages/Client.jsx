import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaUsers, FaHandshake, FaStar } from 'react-icons/fa';

export default function Client() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const clientStats = [
    { icon: FaUsers, number: "150+", label: "Happy Clients", color: "text-red-400" },
    { icon: FaBuilding, number: "300+", label: "Projects Completed", color: "text-green-500" },
    { icon: FaHandshake, number: "25+", label: "Years Experience", color: "text-blue-500" },
    { icon: FaStar, number: "98%", label: "Client Satisfaction", color: "text-yellow-500" }
  ];

  const clientCategories = [
    {
      title: "Healthcare Sector",
      count: "35+ Clients",
      description: "Medical hospitals, clinics, and healthcare facilities",
      projects: [
        "Kiran Medical Hospital - Paving & Kerb Installation",
        "City General Hospital - Compound Wall Construction",
        "Medicare Clinic - Precast Boundary Wall",
        "Health Center Complex - Interlocking Paver Blocks"
      ]
    },
    {
      title: "Educational Institutions", 
      count: "28+ Clients",
      description: "Schools, colleges, and educational complexes",
      projects: [
        "Regional Engineering College - Campus Paving",
        "Public School System - Playground Pavers",
        "University Campus - Kerb Stone Installation",
        "Technical Institute - Boundary Wall Construction"
      ]
    },
    {
      title: "Commercial Complexes",
      count: "42+ Clients", 
      description: "Shopping malls, office buildings, and commercial spaces",
      projects: [
        "Business Park - Extensive Paving Work",
        "Shopping Complex - Decorative Pavers",
        "Office Tower - Compound Wall & Gates",
        "Commercial Plaza - Complete Infrastructure"
      ]
    },
    {
      title: "Residential Projects",
      count: "45+ Clients",
      description: "Housing societies, residential complexes, and gated communities",
      projects: [
        "Luxury Villas - Premium Paver Installation",
        "Housing Society - Boundary Wall Construction",
        "Apartment Complex - Parking Area Paving",
        "Gated Community - Complete Infrastructure"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Dr. Rajesh Patel",
      designation: "Director, Kiran Medical Hospital",
      company: "Healthcare Sector",
      testimonial: "SunShine EnterPrises delivered exceptional quality work for our hospital infrastructure. Their paver blocks and kerb stones have enhanced our facility's accessibility and aesthetics significantly.",
      rating: 5
    },
    {
      name: "Prof. Anita Sharma",
      designation: "Principal",
      company: "Regional Engineering College",
      testimonial: "Outstanding service and quality products. The campus paving work was completed on time with minimal disruption to academic activities. Highly professional team.",
      rating: 5
    },
    {
      name: "Mr. Vikash Kumar",
      designation: "Project Manager",
      company: "Metro Construction Ltd.",
      testimonial: "We have been working with SunShine EnterPrises for multiple commercial projects. Their concrete products are reliable, durable, and competitively priced.",
      rating: 5
    },
    {
      name: "Mrs. Priya Jain",
      designation: "Resident Welfare Association",
      company: "Green Valley Society",
      testimonial: "Excellent work on our residential complex. The precast boundary walls and paver blocks have transformed our community. Professional approach and timely delivery.",
      rating: 5
    }
  ];

  const achievements = [
    {
      year: "2009",
      milestone: "Company Establishment",
      description: "Founded SunShine EnterPrises with a vision to provide quality cement products"
    },
    {
      year: "2012", 
      milestone: "50+ Projects Completed",
      description: "Reached significant milestone with diverse client portfolio across sectors"
    },
    {
      year: "2016",
      milestone: "100+ Happy Clients",
      description: "Expanded operations and established strong market presence in Jharkhand"
    },
    {
      year: "2020",
      milestone: "Regional Recognition",
      description: "Recognized as leading manufacturer of quality concrete products in the region"
    },
    {
      year: "2024",
      milestone: "150+ Clients Served",
      description: "Continuing excellence with expanding client base and innovative solutions"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3">
          <nav className="text-xs sm:text-sm text-gray-500">
             <button onClick={() => navigate('/')} className="hover:text-red-400 transition-colors">
              Home
            </button>
            <span className="mx-1 sm:mx-2">/</span>
            <span className="text-red-400 font-medium">Our Clients</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-400 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-4 lg:py-6">
          <div className="text-center">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold  mb-1 sm:mb-2 md:mb-3">
              Our Valued Clients
            </h1>
            <p className="text-xs sm:text-sm text-red-100 max-w-4xl mx-auto leading-relaxed">
              Building lasting relationships through quality products and exceptional service. 
              Proud to serve 150+ satisfied clients across healthcare, education, commercial, and residential sectors.
            </p>
          </div>
        </div>
      </div>

      {/* Client Statistics */}
      <div className="bg-white py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
              Our Achievements in Numbers
            </h2>
            <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 max-w-2xl mx-auto">
              These numbers reflect our commitment to excellence and client satisfaction
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {clientStats.map((stat, index) => (
              <div key={index} className="text-center p-4 sm:p-6 rounded-xl bg-gray-50 hover:bg-red-50 transition-colors duration-300">
                <div className={`text-lg sm:text-xl lg:text-2xl mb-3 sm:mb-4 ${stat.color} flex justify-center`}>
                  <stat.icon />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                  {stat.number}
                </h3>
                <p className="text-[11px] sm:text-xs md:text-sm text-gray-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Client Categories */}
      <div className="bg-gray-50 py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xs sm:text-sm font-bold text-gray-900 mb-3 sm:mb-4">
              Client Portfolio by Sector
            </h2>
            <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 max-w-3xl mx-auto">
              We serve diverse industries with specialized solutions tailored to their unique requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {clientCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-[12px] sm:text-sm font-bold text-gray-900">
                    {category.title}
                  </h3>
                  <span className="bg-red-100 text-red-800 text-[11px] sm:text-xs font-semibold px-2 sm:px-3 py-1 rounded-full">
                    {category.count}
                  </span>
                </div>
                
                <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 mb-4">
                  {category.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900">Notable Projects:</h4>
                  <ul className="space-y-1">
                    {category.projects.map((project, projectIndex) => (
                      <li key={projectIndex} className="text-xs sm:text-sm text-gray-600 flex items-start">
                        <span className="w-1 h-1 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        <span>{project}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Client Testimonials */}
      <div className="bg-white py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xs sm:text-sm font-bold text-gray-900 mb-3 sm:mb-4">
              What Our Clients Say
            </h2>
            <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 max-w-2xl mx-auto">
              Real feedback from satisfied clients across different sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-4 sm:p-6 hover:bg-red-50 transition-colors duration-300">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="flex-1">
                    <h4 className="text-[11px] sm:text-xs md:text-sm font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-gray-600">
                      {testimonial.designation}
                    </p>
                    <p className="text-[11px] sm:text-xs text-red-400 font-medium">
                      {testimonial.company}
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, starIndex) => (
                      <FaStar key={starIndex} className="w-3 h-3 text-yellow-400" />
                    ))}
                  </div>
                </div>
                
                <p className="text-[11px] sm:text-xs md:text-sm text-gray-700 leading-relaxed italic">
                  "{testimonial.testimonial}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Timeline */}
    

     </div>
  );
}
