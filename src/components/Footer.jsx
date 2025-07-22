import footerLogo from "../assets/footer-logo.png";
import { Link } from "react-router-dom";

import {FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      {/* top section  */}
      <div className="container m-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* left side  */}
        <div className="md:w-1/2 w-full">
          <img src={footerLogo} alt="footer logo" className="mb-5 w-36"/>
          <ul className="flex flex-col md:flex-row gap-4">
            <li>
              <Link to="/" className="hover:text-primary">Home</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-primary">Services</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-primary">About Us</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-primary">Contact</Link>
            </li>
          </ul>
        </div>
        {/* right side  */}
        <div className="md:w-1/2 w-full">
            <p className="mb-4">Subscribe to stay tuned for new product and latest updates. Let’s do it!</p>
            <div className="flex">
                <input type="email" 
                placeholder="Enter Your Email..."
                className="w-full px-4 py-2 rounded-l-md"
                />
                <button className="bg-primary px-6 py-2 rounded-r-md">Subscribe</button>
            </div>
        </div>
      </div>

      {/* bottom section  */}

      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6">
        {/* left side  */}
        <ul className="flex gap-6 mb-4 md:mb-0">
            <li><Link to="/" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:text-primary">Terms of Services</Link></li>
        </ul>

        {/* right side
         */}
        <div className="flex gap-6">
            <Link to="https://facebook.com" className="hover:text-primary">
            <FaFacebook size={24}/>
            </Link>
            <Link to="https://twitter.com" className="hover:text-primary">
            <FaTwitter size={24}/>
            </Link>
            <Link to="https://instagram.com" className="hover:text-primary">
            <FaInstagram size={24}/>
            </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
