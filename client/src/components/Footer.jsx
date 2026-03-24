import React from 'react';
import { Package, Smartphone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0f0a08] border-t border-brand-gold/10 pt-16 pb-8 relative overflow-hidden">
      
      {/* Background Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 text-center">
        
        <div className="mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-brand-gold via-brand-cream to-brand-gold bg-clip-text text-transparent mb-6">
            علي بابا للشوكولاتة
          </h2>
          <div className="flex justify-center gap-8 text-gray-400">
            <a href="#" className="hover:text-brand-gold transition duration-300 transform hover:scale-110">Instagram</a>
            <a href="#" className="hover:text-brand-gold transition duration-300 transform hover:scale-110">Facebook</a>
            <a href="#" className="hover:text-brand-gold transition duration-300 transform hover:scale-110">TikTok</a>
          </div>
        </div>

        {/* Strategic Delivery Partner */}
        <div className="relative max-w-lg mx-auto mb-16 p-[1px] rounded-2xl bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent">
          <div className="bg-[#140d0b] p-8 rounded-2xl relative overflow-hidden group hover:bg-[#1a120f] transition duration-500">
            
            <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition duration-500"></div>
            
            <div className="relative z-10 flex flex-col items-center gap-4">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest border border-gray-800 px-3 py-1 rounded-full bg-[#0f0a08]">
                📦 الشريك اللوجستي الرسمي لمتجرنا
              </span>
              
              <h3 className="text-3xl font-black text-brand-cream group-hover:text-brand-gold transition duration-300 drop-shadow-lg">
                Prince Delivery <span className="text-4xl align-middle">🛵</span>
              </h3>
              
              <p className="text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">
                توصيل سريع. آمن. ومحترف. نثق بهم لإيصال سعادتكم.
              </p>
              
              <a 
                href="https://wa.me/213664021599" 
                target="_blank"
                className="mt-4 flex items-center gap-2 text-brand-gold border border-brand-gold/30 px-6 py-2 rounded-full hover:bg-brand-gold hover:text-brand-dark transition duration-300 font-bold shadow-lg hover:shadow-brand-gold/20"
              >
                <span>تواصل مع الموصل</span>
                <Smartphone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-gold/5 pt-8 text-gray-600 text-sm dir-ltr">
          <p>© {new Date().getFullYear()} Ali Baba Chocolate. All rights reserved.</p>
          <p className="mt-2 text-xs opacity-50">Designed with ❤️ in Algeria</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
