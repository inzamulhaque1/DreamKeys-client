

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AboutSection />
          <QuickLinks />
          <ContactSection />
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-gray-400 text-sm">© 2025 DreamKeys. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const AboutSection = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">DreamKeys</h3>
      <p className="text-gray-400">
        DreamKeys is your trusted partner in finding the perfect property. We offer a range of properties to meet every need and budget. Start your dream journey with us today!
      </p>
    </div>
  );
};

const QuickLinks = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
      <ul>
        <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
        <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
        <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
        <li><a href="#" className="text-gray-400 hover:text-white">Properties</a></li>
      </ul>
    </div>
  );
};

const ContactSection = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
      <ul>
        <li className="text-gray-400">Email: contact@dreamkeys.com</li>
        <li className="text-gray-400">Phone: +880 1728005274</li>
        <li className="text-gray-400">Address: Ramanandapur Bracmor, Nurpur, Pabna Sadar 6600</li>
      </ul>
    </div>
  );
};

export default Footer;
