import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Loader2, AlertCircle } from 'lucide-react';

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/orders');
      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Could not connect to backend. Ensure server is running on port 5000.');
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-brand-dark text-brand-cream flex justify-center items-center">
      <Loader2 className="animate-spin w-12 h-12 text-brand-gold" />
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-brand-dark text-brand-cream pt-24 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-brand-gold border-b border-brand-gold/20 pb-4">
            🛒 لوحة التحكم - الطلبات
          </h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 flex items-center gap-3">
              <AlertCircle className="w-6 h-6" />
              {error}
            </div>
          )}

          <div className="bg-[#1a120f] border border-brand-gold/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-brand-gold/10 text-brand-gold uppercase text-sm font-bold">
                  <tr>
                    <th className="px-6 py-4">التاريخ</th>
                    <th className="px-6 py-4">نوع الطلب</th>
                    <th className="px-6 py-4">التفاصيل / الميزانية</th>
                    <th className="px-6 py-4">النكهات / المنتج</th>
                    <th className="px-6 py-4">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-gold/5">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                        لا توجد طلبات حتى الآن.
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order._id} className="hover:bg-brand-gold/5 transition duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString('ar-DZ')}
                        </td>
                        <td className="px-6 py-4 font-bold text-white">
                          <span className={`px-2 py-1 rounded-full text-xs ${order.orderType === 'Custom Box' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {order.orderType === 'Custom Box' ? 'بوكس مخصص' : 'منتج جاهز'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {order.budget ? (
                            <span className="font-mono text-brand-gold">{order.budget} دج</span>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {order.flavors && order.flavors.length > 0 
                            ? order.flavors.join('، ')
                            : order.productName
                          }
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold border border-yellow-500/20">
                            {order.status || 'معلق'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
