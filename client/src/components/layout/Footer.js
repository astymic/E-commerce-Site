import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ShoppingCart } from "lucide-react";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-neutral-900 text-neutral-400 py-16 mt-20">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center space-x-2 text-white">
                            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                                <ShoppingCart size={20} strokeWidth={2.5} />
                            </div>
                            <span className="text-xl font-display font-bold tracking-tight">
                                LuxeStore
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed">
                            Premium e-commerce experience with curated products and exceptional service. Redefining your shopping journey with style and quality.
                        </p>
                        <div className="flex items-center space-x-4">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 border border-neutral-800 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm">
                            {['Shop All', 'New Arrivals', 'Best Sellers', 'Discounted Items', 'Store Location'].map((item) => (
                                <li key={item}>
                                    <Link to="/" className="hover:text-primary-500 transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Support</h4>
                        <ul className="space-y-4 text-sm">
                            {['Terms of Service', 'Privacy Policy', 'Shipping Policy', 'Returns & Exchanges', 'FAQ'].map((item) => (
                                <li key={item}>
                                    <Link to={`/legal/${item.toLowerCase().replace(/ /g, '-')}`} className="hover:text-primary-500 transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start space-x-3">
                                <MapPin size={18} className="text-primary-500 shrink-0" />
                                <span>123 Commerce St, Digital City, DC 10101</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={18} className="text-primary-500 shrink-0" />
                                <span>+1 (555) 000-1234</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={18} className="text-primary-500 shrink-0" />
                                <span>support@luxestore.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center text-xs space-y-4 md:space-y-0">
                    <p>© {currentYear} LuxeStore. All Rights Reserved.</p>
                    <div className="flex items-center space-x-6">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;