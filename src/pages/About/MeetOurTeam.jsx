import React from 'react';
import { useNavigate } from 'react-router-dom';
import Director1 from '../../assets/Team/Director1.png';
import Director2 from '../../assets/Team/Director2.png';  
import Director3 from '../../assets/Team/Director3.png';
import GroupPhoto from '../../assets/Team/GroupPhoto.png';
import { FaAward, FaLightbulb, FaHandshake, FaLeaf } from 'react-icons/fa';
 
export default function MeetOurTeam() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const teamMembers = [
    {
      id: 1,
      name: "Padamkumar B Jain",
      position: "Chairman",
      image: Director2,
      description: "Founded VYARA back in 1996 as a fresh electrical engineer, brilliant tactics have made Hari an exceptional leader of capital shortages, government quotas, labour strikes, debt, human resources, and limited availability of knowledge or guidance, and kept the company alive. At Do still active and regular at the office, Widely respected as a most prolific and fast entrepreneur BE Electrical.",
      achievements: ["Founded VYARA in 1996", "BE Electrical", "Strategic Leadership"]
    },
    {
      id: 2,
      name: "Mrs. Kamal Jain",
      position: "Director",
      image: Director2,
      description: "Co-founder of VYARA. She was instrumental in keeping the company together in the late 1990s through till the 2000s. She always blessed with fine happenings and has valuable inputs for the group business. Yoga Meditation.",
      achievements: ["Co-founder of VYARA", "Strategic Vision", "Yoga Meditation"]
    },
    {
      id: 3,
      name: "Mehul Jain",
      position: "Managing Director",
      image: Director3,
      description: "Joined Vyara in 1996 as a second-generation entrepreneur. He worked tirelessly to reach placements of the company. Widely respected as an industry expert. Mehul is primarily responsible for the direction and vision system of the company. New product design and development give Mehul extensive satisfaction. B.Com LLB from Mumbai University. Interests: Family, Fitness, Nature.",
      achievements: ["Second-generation entrepreneur", "B.Com LLB Mumbai University", "Product Design & Development"]
    },
    {
      id: 4,
      name: "Mili Jain",
      position: "Director",
      image: Director1,
      description: "Joined 1997. Mili oversees communications, administration and systems development at VYARA. She continually acts as a moral compass for the group. With an eye for detail and unwavering focus throughout. Mili sees her role as one of compassion and commitment to systems. Mili adds a spine and at along structure to VYARA. MBA, BSc Delhi University Loves Bollywood, fitness, chocolates.",
      achievements: ["MBA, BSc Delhi University", "Communications & Administration", "Systems Development"]
    },
    {
      id: 5,
      name: "Naresh Loh",
      position: "Director",
      image: Director2,
      description: "Joined 2006. Relentless, thorough, and methodical, Naresh has been the trigger of VYARA's growth since 2010. Naresh oversees all sales and production efforts at VYARA. He has driven the entire team to achieve the heights it has reached today. Naresh has an exceptional gift of finding solutions and ways where none seem to exist. No challenges seems difficult for him. Interests: World.",
      achievements: ["Joined 2006", "Sales & Production Leadership", "Strategic Problem Solving"]
    },
    {
      id: 6,
      name: "Mukesh Jain",
      position: "Director",
      image: Director3,
      description: "Joined 2002. Mukesh is the true all rounder at VYARA, overseeing the implementation of new projects, sales, purchasing, profitability and even accounts. Mukesh will do whatever is needed for the teams and fit in any role that may remain. Mukesh has really grown through the ranks and is a testament to what is possible to achieve for anyone. Interests: Family & Food.",
      achievements: ["Joined 2002", "All-rounder expertise", "Multi-departmental leadership"]
    }
  ];

  const values =[
              { title: "Excellence", description: "Striving for the highest quality in everything we do", icon: <FaAward /> },
              { title: "Innovation", description: "Continuously improving and developing new solutions", icon: <FaLightbulb /> },
              { title: "Integrity", description: "Conducting business with honesty and transparency", icon: <FaHandshake /> },
              { title: "Sustainability", description: "Building for the future while protecting our environment", icon: <FaLeaf /> }
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
            <span>About</span>
            <span className="mx-1 sm:mx-2">/</span>
            <span className="text-red-400 font-medium">Meet the Team</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-400 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-4 lg:py-6">
          <div className="text-center">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 md:mb-3">
              Meet Our Team
            </h1>
            <p className="text-xs sm:text-sm text-red-100 max-w-3xl mx-auto leading-relaxed">
              The dedicated professionals behind SunShine EnterPrises' success story. 
              Our leadership team brings decades of experience and innovation to the industry.
            </p>
          </div>
        </div>
      </div>

      {/* Group Photo Section */}
      <div className="bg-white py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
              Our Team Together
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto">
              United in our mission to deliver excellence in every project
            </p>
          </div>
          
          <div className="relative rounded-xl overflow-hidden shadow-2xl lg:max-w-[900px] lg:max-h-[400px] mx-auto">
            <img 
              src={GroupPhoto} 
              alt="SunShine EnterPrises Team Group Photo"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Leadership Team Section */}
      <div className="bg-gray-50 py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
              Leadership Team
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-3xl mx-auto">
              Meet the visionaries who have shaped SunShine EnterPrises into the industry leader it is today
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                {/* Image Section */}
                <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-5 lg:p-6">
                  <div className="mb-3 sm:mb-4">
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1 sm:mb-2">
                      {member.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-red-400 bg-red-50 px-2 sm:px-3 py-1 rounded-full inline-block">
                      {member.position}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4 line-clamp-4">
                    {member.description}
                  </p>

                  {/* Achievements */}
                  <div className="space-y-1 sm:space-y-2">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {member.achievements.map((achievement, index) => (
                        <li key={index} className="text-xs sm:text-sm text-gray-600 flex items-start">
                          <span className="w-1 h-1 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Values Section */}
      <div className="bg-white py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
              Our Values
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto">
              The principles that guide our team every day
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            { values.length !== 0 && values.map((value, index) => (
              <div key={index} className="text-center p-4 sm:p-6 rounded-xl bg-gray-50 hover:bg-red-50 transition-colors duration-300">
                <div className="text-lg sm:text-xl lg:text-2xl mb-3 sm:mb-4 text-red-400 flex justify-center">{value.icon}</div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3">
                  {value.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-400 to-red-500 text-white py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 text-center">
          <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">
            Ready to Work with Our Team?
          </h2>
          <p className="text-xs sm:text-sm text-red-100 mb-4 sm:mb-6 max-w-2xl mx-auto">
            Get in touch with SunShine EnterPrises today and discover how our expertise can benefit your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <button 
              onClick={() => handleNavigation('/contact')}
              className="bg-white text-red-500 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm hover:bg-red-50 transition-colors duration-300 w-full sm:w-auto"
            >
              Contact Us Today
            </button>
        
          </div>
        </div>
      </div>

     </div>
  );
}
