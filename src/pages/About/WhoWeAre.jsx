import React from 'react';
import { useNavigate } from 'react-router-dom';
import FencingPole from  '../../assets/Product/FencingPoles/FencingPoles1.png';
import FlyAshBrick from '../../assets/Product/FlyAshBricks/FlyAshBrick1.png';
import PrecastBoundaryWall from '../../assets/Product/PreCastBoundaryWall/PreCast1.png';
import CconBlocks from '../../assets/Product/CconBlocks/CconBlocks1.png';
import KerbStone from '../../assets/Product/KerbStone/KerbStone1.png';
import PaverBlock from '../../assets/Product/PaverBlocks/PaverBlocks1.png';

export default function WhoWeAre() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

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
            <span>About</span>
            <span className="mx-1 sm:mx-2">/</span>
            <span className="text-red-400 font-medium">Who We Are</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      {/* <div className="bg-gradient-to-r from-red-400 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-4 lg:py-6">
          <div className="text-center">
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold mb-1 sm:mb-2 md:mb-3">
              Who We Are
            </h1>
            <p className="text-xs sm:text-sm text-red-100 max-w-4xl mx-auto leading-relaxed">
              Leading manufacturer and supplier of premium cement products including Cement Poles, PSC Concrete Poles, 
              and Compound Walls. Established in Hazaribagh, Jharkhand with excellence since 2009.
            </p>
          </div>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-3 space-y-6 sm:space-y-8">
            
            {/* About Us Content */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                About Sunshine Enterprises
              </h2>
              
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
                Established in the year 2008, we <strong>"SUNSHINE ENTERPRISES"</strong> are engaged in manufacturing 
                the best quality array of <strong>Cement Blocks, Cement Compound Wall, Interlocking Paver Block, 
                fly ash bricks etc</strong>. The offered products are manufactured by us using superior quality raw 
                material and latest technology.
              </p>
              
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
                Since 2008, our pavement blocks have rooted their aesthetically fabricated blocks in the industrial 
                and residential floors. Sunshine Enterprises is renowned as a house for diverse and unique range of 
                styles/patterns of paver blocks. We laid a strong foothold in the Interlocking Paver Block segment 
                with our standard and custom offerings.
              </p>
              
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                Our fabrication technique embraces cost-effectiveness through its everlasting serviceability. We are 
                one-of-a-kind manufacturers, and our interlocking paver solutions gratify our customers' futuristic 
                pavement demand. We fabricate blocks with thicknesses such as <strong>60 mm, 80 mm, 100 mm</strong> 
                available in different colours as per customers' requirements.
              </p>
            </div>

            {/* Our Leadership */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                Our Leadership
              </h2>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                The guidance of our mentor, <strong>"Mr. Yash Agrawal"</strong>, has been a great support for the 
                growth and development of the organization. His ability to understand ongoing market trends, managerial 
                skills and ability to make good decisions, has been our most valuable asset to grow rapidly.
              </p>
            </div>

            {/* Our Vision */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                Our Vision
              </h2>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
                To be a leading force in manufacturing excellence, driven by innovation, precision, and sustainability. 
                We aim to set new standards in quality and efficiency, empowering industries with reliable products 
                while fostering a culture of continuous improvement and environmental responsibility.
              </p>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                We aim to be a trusted leader in concrete product manufacturing by delivering durable, innovative, 
                and sustainable solutions that shape the foundation of modern infrastructure. We strive to build 
                lasting value for our clients, our communities, and the environment through precision, performance, 
                and a commitment to quality.
              </p>
            </div>

            {/* Our Specialty */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                Our Specialty
              </h2>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
                We are fortunate by our outstanding name for reliability and service which are obstinate by our 
                economical pricing, quality product, quick reply & on time delivery. It is then, comfortable for 
                us to lodge any exact requirements of the customers expertly. We stay in to invest extensively 
                in the progression of our manufacturing & R&D facilities to meet the necessities of the customers.
              </p>
            </div>

            {/* Why Us */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                Why Us?
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Modest pricing is built on constant growth, value engineering & frugal practices.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  The elasticity of batch & mass production.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Fast reply time & very good expansion cost.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Astonishing product surface finishes with the use of high quality tooling and forging techniques.
                </li>
              </ul>
            </div>

            {/* Company Information Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  Company Information
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                        Nature of Business
                      </td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-700">
                        Manufacturers, Wholesaler
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                        Number of Employees
                      </td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-700">
                        Below 20
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                        Year of Establishment
                      </td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-700">
                        2008
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                        Name of CEO
                      </td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-700">
                        Mr. Yash Agrawal
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                        GST No
                      </td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-700">
                        20ABLFS9276L1ZK
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                        Annual Turnover
                      </td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-700">
                        Rs. 2.5 to 5 Crore Approx.
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                        Legal Status of Firm
                      </td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-700">
                        Individual (Sole proprietorship)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Products Section */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 sticky top-20">
            

              {/* Contact Info */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3 sm:mb-4">
                  Contact Us
                </h4>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
                  <div>
                    <p className="font-medium text-gray-900">Sunshine Enterprises</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-80f0">Office Address:</p>
                    <p>Marwari Motor Service, Near Old Bus Stand</p>
                    <p>Hazaribagh, Jharkhand - 825301</p>
                    <p>India</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Plant Address:</p>
                    <p>Jamuari Phatha, Barkagaon Road</p>
                    <p>Hazaribagh, Jharkhand - 825301</p>
                    <p>India</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-900 mb-2">
                    Call Us:
                  </p>
                  <div className="space-y-1">
                    <p className="text-red-400 hover:underline text-xs sm:text-sm">9953050186</p>
                    <p className="text-red-400 hover:underline text-xs sm:text-sm">9431141333</p>
                    <p className="text-red-400 hover:underline text-xs sm:text-sm">7541072627</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-900 mb-2">E-mail:</p>
                  <div className="space-y-1">
                    <a 
                      href="mailto:sunshineenterprises.2008@rediffmail.com" 
                      className="text-red-400 hover:underline text-xs sm:text-sm block break-all"
                    >
                      sunshineenterprises.2008@rediffmail.com
                    </a>
                    <a 
                      href="mailto:yashagarwal14@gmail.com" 
                      className="text-red-400 hover:underline text-xs sm:text-sm block break-all"
                    >
                      yashagarwal14@gmail.com
                    </a>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleNavigation('/contact')}
                  className="w-full mt-4 sm:mt-6 bg-red-400 hover:bg-red-500 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold text-xs sm:text-sm transition-colors duration-300"
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
            Ready to Build with Quality Materials?
          </h2>
          <p className="text-xs sm:text-sm text-red-100 mb-4 sm:mb-6 max-w-3xl mx-auto">
            Contact Sunshine Enterprises today for premium cement products and reliable service that meets your construction needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <button 
              onClick={() => handleNavigation('/contact')}
              className="bg-white text-red-500 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm hover:bg-red-50 transition-colors duration-300 w-full sm:w-auto"
            >
              Get Quote Now
            </button>
            
          </div>
        </div>
      </div>

     </div>
  );
}