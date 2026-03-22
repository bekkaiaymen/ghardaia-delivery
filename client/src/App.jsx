import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickupLocation: 'وسط غرداية',
    deliveryLocation: '',
    itemDescription: ''
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // تحديث القيم عند التغيير
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // إرسال الطلب
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Use environment variable for production, fallback to localhost for development
      const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/orders';
      
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('تم إرسال طلبك بنجاح! سنتصل بك فوراً لتأكيد الطلب.');
        setFormData({ name: '', phone: '', pickupLocation: 'وسط غرداية', deliveryLocation: '', itemDescription: '' });
      } else {
        setMessage('حدث خطأ: ' + data.message);
      }
    } catch (error) {
      console.error('Network error:', error);
      setMessage('تعذر الاتصال بالخادم. تأكد من تشغيل الخادم والاتصال بالإنترنت.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>توصيل غرداية السريع 📦</h1>
        <p>خدمتكم راحتنا - في كل ربوع وادي ميزاب</p>
      </header>

      <main className="main-content">
        <section className="order-form-section">
          <h2>اطلب توصيل الآن</h2>
          <form className="order-form" onSubmit={handleSubmit}>
            
            <div className="form-group">
              <label>الاسم الكامل</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="مثال: محمد .." 
                required 
              />
            </div>

            <div className="form-group">
              <label>رقم الهاتف</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="06xxxxxxxx" 
                required 
              />
            </div>

            <div className="form-group">
              <label>مكان الاستلام (من أين نأخذ الغرض؟)</label>
              <select name="pickupLocation" value={formData.pickupLocation} onChange={handleChange}>
                <option value="وسط غرداية">وسط غرداية</option>
                <option value="بني يزقن">بني يزقن</option>
                <option value="بوهراوة">بوهراوة</option>
                <option value="مليكة">مليكة</option>
                <option value="العطف">العطف</option>
                <option value="القرارة">القرارة</option>
                <option value="بريان">بريان</option>
                <option value="زلفانة">زلفانة</option>
                <option value="متليلي">متليلي</option>
                <option value="سبسب">سبسب</option>
                <option value="المنصورة">المنصورة</option>
              </select>
            </div>

            <div className="form-group">
              <label>مكان التوصيل (إلى أين نذهب؟)</label>
              <input 
                type="text" 
                name="deliveryLocation" 
                value={formData.deliveryLocation} 
                onChange={handleChange} 
                placeholder="اسم الحي أو المعلم القريب" 
                required 
              />
            </div>

            <div className="form-group">
              <label>وصف الغرض</label>
              <textarea 
                name="itemDescription" 
                value={formData.itemDescription} 
                onChange={handleChange} 
                placeholder="ماذا تريد توصيله؟ (مثلاً: وثائق، طرد صغير، أكل..)" 
                rows="3"
              ></textarea>
            </div>

            <button type="submit" disabled={isSubmitting} className="submit-btn">
              {isSubmitting ? 'جاري الإرسال...' : 'تأكيد الطلب'}
            </button>
          </form>

          {message && <div className={`message-box ${message.includes('خطأ') ? 'error' : 'success'}`}>{message}</div>}
        </section>
        
        <section className="info-section">
          <h3>كيف نعمل؟</h3>
          <div className="steps">
            <div className="step">
              <span>1</span>
              <p>املأ الاستمارة</p>
            </div>
            <div className="step">
              <span>2</span>
              <p>نتصل بك للتأكيد</p>
            </div>
            <div className="step">
              <span>3</span>
              <p>نصلك في أسرع وقت</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 خدمة توصيل غرداية. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  )
}

export default App
