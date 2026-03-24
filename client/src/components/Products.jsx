import React from 'react';
import { ShoppingBag, Truck, MapPin } from 'lucide-react';

const Products = () => {
  const products = [
    {
      id: 1,
      name: 'كيكة الشوكولاتة الذائبة',
      price: 3500,
      image: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'local',
      desc: 'غنية بالشوكولاتة البلجيكية الفاخرة، تقدم طازجة وساخنة لتذوب في الفم.',
      tag: 'الأكثر طلباً 🔥'
    },
    {
      id: 2,
      name: 'صندوق الشوكولاتة الملكي',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'national',
      desc: 'تجربة تذوق استثنائية تجمع أفخر أنواع الشوكولاتة في صندوق خشبي فاخر.',
      tag: 'شحن لـ 58 ولاية 🚚'
    }
  ];

  return (
    <section id="products" className="py-20 relative bg-[#0f0a08]">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold bg-gradient-to-tr from-brand-gold via-brand-gold-light to-brand-gold bg-clip-text text-transparent mb-4">
            تشكيلات الشوكولاتة الفاخرة
          </h3>
          <div className="h-1 w-24 bg-brand-gold mx-auto rounded-full"></div>
        </div>

        {/* Local Delivery Section */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8 justify-center">
            <div className="h-px bg-brand-gold/30 w-16 md:w-32"></div>
            <span className="flex items-center gap-2 text-brand-cream text-lg md:text-xl font-bold bg-[#1a120f] px-6 py-2 rounded-full border border-brand-gold/30 shadow-lg shadow-brand-gold/5">
              <MapPin className="text-brand-gold w-5 h-5" /> 
              توصيل حصري في غرداية
            </span>
            <div className="h-px bg-brand-gold/30 w-16 md:w-32"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {products.filter(p => p.category === 'local').map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* National Delivery Section */}
        <div>
          <div className="flex items-center gap-4 mb-8 justify-center">
            <div className="h-px bg-brand-gold/30 w-16 md:w-32"></div>
            <span className="flex items-center gap-2 text-brand-cream text-lg md:text-xl font-bold bg-[#1a120f] px-6 py-2 rounded-full border border-brand-gold/30 shadow-lg shadow-brand-gold/5">
              <Truck className="text-brand-gold w-5 h-5" /> 
              توصيل متوفر لـ 58 ولاية
            </span>
            <div className="h-px bg-brand-gold/30 w-16 md:w-32"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            {products.filter(p => p.category === 'national').map(product => (
              <ProductCard key={product.id} product={product} isFeatured={true} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

const ProductCard = ({ product, isFeatured }) => {
  const whatsappLink = `https://wa.me/213664021599?text=${encodeURIComponent(`مرحباً، أريد طلب: ${product.name}`)}`;

  return (
    <div className={`group relative bg-[#1a120f] rounded-2xl overflow-hidden border border-brand-gold/10 hover:border-brand-gold/50 transition-all duration-500 shadow-xl hover:shadow-brand-gold/20 ${isFeatured ? 'md:flex' : ''}`}>
      
      {/* Image */}
      <div className={`relative overflow-hidden ${isFeatured ? 'md:w-1/2 h-64 md:h-auto' : 'h-64'}`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out"
        />
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-brand-gold text-brand-dark text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {product.tag}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a120f] to-transparent opacity-60"></div>
      </div>

      {/* Content */}
      <div className={`p-6 md:p-8 flex flex-col justify-between ${isFeatured ? 'md:w-1/2' : ''}`}>
        
        <div>
          <h4 className="text-2xl font-bold text-brand-cream mb-2 group-hover:text-brand-gold transition duration-300">
            {product.name}
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            {product.desc}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-gold/10">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase tracking-widest">السعر</span>
            <span className="text-2xl font-bold text-brand-gold">{product.price} دج</span>
          </div>
          
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-brand-dark border border-brand-gold/30 text-brand-gold hover:bg-brand-gold hover:text-brand-dark px-6 py-3 rounded-xl transition duration-300 font-bold"
          >
            <ShoppingBag className="w-5 h-5" />
            اطلب الآن
          </a>
        </div>
      </div>
    </div>
  );
};

export default Products;
