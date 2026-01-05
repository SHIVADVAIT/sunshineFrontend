import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-700 text-white pointer-events-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white mb-1">
                SunShine EnterPrises<span className="text-[11px] align-super">®</span>
              </h2>
            </div>
            
            <div className="text-gray-300 space-y-1 text-[12px] md:text-[14px] leading-relaxed">
              <p className="font-medium">SunShine EnterPrises</p>
              <p>(Formerly known as SunShine Tiles Pvt. Ltd.)</p>
            </div>
            
            <div className="mt-4 text-gray-300 space-y-1 text-[12px] md:text-[14px]">
              <p>903-904 Rajhans Montessa,</p>
              <p>Near Le Meridian, Dumas Road,</p>
              <p>Surat 395007 Gujarat (INDIA)</p>
            </div>
            
            <div className="mt-4 text-gray-300 space-y-1 text-[12px] md:text-[14px]">
              <p>+91-261-2471595 | +91-261-2472444</p>
              <p>info@sunshineenterprises.in</p>
            </div>
            
            {/* Social Media Icons */}
           
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Products</h4>
            <ul className="space-y-2 text-[12px] md:text-[14px]">
              <li><Link to="/paver-blocks" className="text-gray-300 hover:text-white transition duration-300">Paver Blocks</Link></li>
              <li><Link to="/boundary-walls" className="text-gray-300 hover:text-white transition duration-300">Boundary Walls</Link></li>
              <li><Link to="/concrete-blocks" className="text-gray-300 hover:text-white transition duration-300">Concrete Blocks</Link></li>

            </ul>
          </div>

          {/* More Info */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">More Info</h4>
            <ul className="space-y-2 text-[12px] md:text-[14px]">
              <li><Link to="/project" className="text-gray-300 hover:text-white transition duration-300">Projects</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-white transition duration-300">Gallery</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition duration-300">Contact</Link></li>
              <li><Link to="/clients" className="text-gray-300 hover:text-white transition duration-300">Clients</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">About</h4>
            <ul className="space-y-2 text-[12px] md:text-[14px]">
              <li><Link to="/who-we-are" className="text-gray-300 hover:text-white transition duration-300">Who We Are</Link></li>
              <li><Link to="/meet-our-team" className="text-gray-300 hover:text-white transition duration-300">Meet Our Team</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition duration-300">Find Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition duration-300">Enquiry Form</Link></li>
              <li><Link to="/admin/login" className="text-gray-300 hover:text-white transition duration-300">Admin Login</Link></li>

            </ul>
          </div>

          {/* Contact */}
          {/* <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-[12px] md:text-[14px]">

            </ul>
          </div> */}
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-700 mt-2 pt-8">
          <div className="flex flex-col md:flex-row justify-center  items-center">
            
            <p className="text-gray-400 text-[11px]  sm:text-sm">
              © {currentYear} SunShine Enterprises Limited. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
