import React, { useState } from 'react';
import { Package, Check, Smartphone, Loader2 } from 'lucide-react';

const CustomBoxBuilder = () => {
  const [budget, setBudget] = useState(null);
  const [flavors, setFlavors] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleFlavor = (flavor) => {
    if (flavors.includes(flavor)) {
      setFlavors(flavors.filter(f => f !== flavor));
    } else {
      setFlavors([...flavors, flavor]);
    }
  };

  const handleOrder = async () => {
    if (!budget && flavors.length === 0) {
      alert('الرجاء اختيار الميزانية أو النكهات أولاً!');
      return;
    }

    setLoading(true);

    const orderData = {
      orderType: 'Custom Box',
      budget,
      flavors,
      productName: `Custom Box (${budget} DZD)`,
    };

    // 1. Try to save to backend (Best Effort)
    try {
      await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
    } catch (error) {
      console.error('Backend sync failed, proceeding to WhatsApp...', error);
    }

    // 2. Construct WhatsApp Message
    const phone = "213664021599";
    let message = `مرحباً، أريد طلب بوكس شوكولاتة مخصص.`;
    
    if (budget) message += `\n💰 الميزانية: ${budget} دج`;
    else message += `\n💰 الميزانية: (لم تحدد بعد)`;
    
    if (flavors.length > 0) message += `\n🍫 النكهات المفضلة: ${flavors.join('، ')}`;
    else message += `\n🍫 النكهات المفضلة: (لم تحدد بعد)`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

    setLoading(false);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="custom-box" className="py-20 bg-[#1a120f] relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block p-3 rounded-full bg-brand-gold/10 text-brand-gold mb-2">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-brand-gold via-brand-cream to-brand-gold bg-clip-text text-transparent">
            صمم بوكس السعادة 🎁
          </h3>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            اختر ميزانيتك ونكهاتك المفضلة، لنقوم بتجهيز بوكس يليق بك وبأحبائك.
          </p>
        </div>

        <div className="bg-[#140d0b] border border-brand-gold/20 rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Step 1: Budget */}
            <div className="space-y-6">
              <h4 className="flex items-center gap-3 text-xl font-bold text-brand-cream">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-gold text-brand-dark font-bold text-sm">1</span>
                اختر الميزانية:
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {[2000, 4000, '7000+'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setBudget(opt)}
                    className={`relative group p-4 rounded-xl border transition-all duration-300 flex items-center justify-between
                      ${budget === opt 
                        ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' 
                        : 'border-white/10 bg-white/5 text-gray-400 hover:border-brand-gold/50 hover:text-brand-cream'
                      }`}
                  >
                    <span className="text-lg font-medium">{opt} دج</span>
                    {budget === opt && <Check className="w-5 h-5 text-brand-gold" />}
                    <div className="absolute inset-0 rounded-xl bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Flavors */}
            <div className="space-y-6">
              <h4 className="flex items-center gap-3 text-xl font-bold text-brand-cream">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-gold text-brand-dark font-bold text-sm">2</span>
                اختر النكهات:
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {['شوكولاتة داكنة', 'شوكولاتة بالحليب', 'مكسرات', 'كراميل'].map((flavor) => (
                  <button
                    key={flavor}
                    onClick={() => toggleFlavor(flavor)}
                    className={`relative p-4 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-2 text-center h-32
                      ${flavors.includes(flavor)
                        ? 'border-brand-gold bg-brand-gold/10 text-brand-gold scale-105 shadow-lg shadow-brand-gold/10' 
                        : 'border-white/10 bg-white/5 text-gray-400 hover:border-brand-gold/50 hover:text-brand-cream'
                      }`}
                  >
                    <span className="text-2xl">{getFlavorIcon(flavor)}</span>
                    <span className="font-medium">{flavor}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <button
              onClick={handleOrder}
              disabled={loading}
              className={`
                inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 rounded-full text-lg font-bold text-white shadow-lg transition-all duration-300
                ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#25D366] hover:bg-[#1ebc57] hover:shadow-green-500/30 hover:-translate-y-1'}
              `}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  جاري التحضير...
                </>
              ) : (
                <>
                  <Smartphone className="w-6 h-6" />
                  أكمل الطلب عبر الواتساب
                </>
              )}
            </button>
            <p className="mt-4 text-sm text-gray-500">
              * سيتم تحويلك مباشرة لمحادثة الواتساب لإتمام التفاصيل
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

const getFlavorIcon = (flavor) => {
  switch (flavor) {
    case 'شوكولاتة داكنة': return '🌑';
    case 'شوكولاتة بالحليب': return '🥛';
    case 'مكسرات': return '🌰';
    case 'كراميل': return '🍯';
    default: return '🍬';
  }
};

export default CustomBoxBuilder;
