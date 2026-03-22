# مشروع توصيل غرداية

هذا هو الكود المصدري لمشروع التوصيل. يتكون من جزأين:
1. **client**: واجهة الموقع (React).
2. **server**: الخادم وقاعدة البيانات (Node.js & MongoDB).

## كيفية التشغيل محلياً (على جهازك)

### 1. تشغيل الخادم (Server)
افتح التيرمينال (Terminal) واكتب الأوامر التالية:
```bash
cd server
npm install
npm run dev
```
سيعمل الخادم على الرابط: `http://localhost:5000`

### 2. تشغيل الواجهة (Client)
افتح نافذة تيرمينال جديدة واكتب:
```bash
cd client
npm install
npm run dev
```
سيبدأ الموقع بالعمل، افتح الرابط الظاهر لك (غالباً `http://localhost:5173`).

---

## كيفية الرفع على الاستضافة المجانية (Render + GitHub)

### الخطوة 1: رفع الكود إلى GitHub
1. أنشئ مستودعاً جديداً (New Repository) في حسابك على GitHub.
2. ارفع هذين المجلدين (`client` و `server`) إلى ذلك المستودع.

### الخطوة 2: استضافة الخادم (Backend) على Render
1. سجل الدخول إلى [Render.com](https://render.com).
2. انقر على **New +** واختر **Web Service**.
3. اربط حساب GitHub واختر مستودع المشروع.
4. الإعدادات المهمة:
   - **Name**: `ghardaia-server` (أو أي اسم).
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Environment Variables**:
     - `MONGODB_URI`: أدخل رابط قاعدة بيانات MongoDB Atlas الخاصة بك.
5. انقر **Create Web Service**.
6. **انسخ رابط الخادم الجديد** (مثلاً: `https://ghardaia-server.onrender.com`).

### الخطوة 3: استضافة الموقع (Frontend) على Render
1. في Render، انقر **New +** واختر **Static Site**.
2. اختر نفس المستودع.
3. الإعدادات المهمة:
   - **Name**: `ghardaia-delivery`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Environment Variables**:
     - `VITE_API_URL`: `https://ghardaia-server.onrender.com/api/orders` (ضع رابط الخادم الذي نسخته في الخطوة السابقة + `/api/orders`).
4. انقر **Create Static Site**.

مبروك! موقعك الآن يعمل أونلاين.
