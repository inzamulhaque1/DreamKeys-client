import logo from "../assets/logo/DKLogoMain.png";

const Footer = () => {
  return (
    <footer className="bg-blue-100 dark:bg-gray-900 text-gray-800 dark:text-white py-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <AboutSection />
          <QuickLinks />
          <ContactSection />
        </div>
        <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">© 2025 DreamKeys. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const AboutSection = () => {
  return (
    <div>
      <img src={logo} alt="" />
      <p className="text-gray-600 mt-6 dark:text-gray-400">
        DreamKeys is your trusted partner in finding the perfect property. We offer a range of properties to meet every need and budget. Start your dream journey with us today!
      </p>
    </div>
  );
};

const QuickLinks = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
      <ul className="space-y-2">
        <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">Home</a></li>
        <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">About Us</a></li>
        <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">Contact</a></li>
        <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">Properties</a></li>
      </ul>
    </div>
  );
};

const ContactSection = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contact Us</h3>
      <ul className="space-y-2">
        <li className="text-gray-600 dark:text-gray-400">Email: inzamulhaque1002@gmail.com</li>
        <li className="text-gray-600 dark:text-gray-400">Phone: +880 1728005274</li>
        <li className="text-gray-600 dark:text-gray-400">Address: Ramanandapur Bracmor, Nurpur, Pabna Sadar 6600</li>
      </ul>
    </div>
  );
};

export default Footer;
