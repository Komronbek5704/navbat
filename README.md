# E-Navbat - Elektron Poliklinika Tizimi (Full-Stack)

E-Navbat - bu O'zbekiston poliklinikalari uchun to'liq Full-Stack elektron navbat tizimi.

## **Xususiyatlari**

- Shifokorlarga onlayn navbat olish
- Mobil qurilmalar uchun moslashuvchan dizayn
- Foydalanuvchi autentifikatsiyasi
- Real vaqtda navbat holati
- Supabase bulut ma'lumotlar bazasi
- Vercel Serverless Functions
- To'liq Full-Stack arxitektura

## **Texnologiyalar**

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Responsive Web Design
- LocalStorage for session management

### Backend
- Vercel Serverless Functions
- Node.js 18.x
- Supabase (PostgreSQL)
- CORS support

### Database
- Supabase (PostgreSQL)
- Row Level Security (RLS)
- Real-time subscriptions

### Hosting & Deployment
- Vercel (Frontend + Backend)
- Supabase (Database)
- GitHub (Version Control)

## **Database Schema**

### Jadvallar:
- **doctors** - Shifokorlar ma'lumotlari
- **appointments** - Navbatlar
- **users** - Foydalanuvchilar
- **working_hours** - Ish vaqtlari

Batafsil: [database-schema.md](./database-schema.md)

## **API Endpoints**

### Health Check
```
GET /api/health
```

### Shifokorlar
```
GET /api/doctors              - Barcha faol shifokorlar
POST /api/doctors             - Yangi shifokor qo'shish (admin)
```

### Navbatlar
```
GET /api/appointments              - Navbatlar ro'yxati
GET /api/appointments?phone=...    - Telefon raqami bo'yicha
GET /api/appointments?id=...       - ID bo'yicha
POST /api/appointments             - Yangi navbat olish
PUT /api/appointments              - Navbatni yangilash
DELETE /api/appointments           - Navbatni o'chirish
```

## **Lokal ishga tushurish**

### 1** **Environment Variables**
```bash
# .env faylini yarating
cp .env.example .env
```

### 2** **Supabase sozlamalari**
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-jwt-secret
```

### 3** **Dependencies o'rnatish**
```bash
npm install
```

### 4** **Lokal server**
```bash
npm run dev
```

## **Vercelga yuklash**

### 1** **Supabase Project yaratish**
1. [Supabase](https://supabase.com) ga kirish
2. Yangi project yaratish
3. Database schema yuklash
4. Sample data qo'shish

### 2** **GitHub repository**
```bash
git init
git add .
git commit -m "E-Navbat Full-Stack - birinchi versiya"
git branch -M main
git remote add origin https://github.com/USERNAME/e-navbat.git
git push -u origin main
```

### 3** **Vercel deployment**
1. [Vercel](https://vercel.com) ga kirish
2. "New Project" → GitHub repository tanlash
3. Environment variables qo'shish:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `JWT_SECRET`
4. Build sozlamalari:
   - **Framework**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `.`
5. "Deploy" tugmasini bosish

## **Ishlash tartibi**

1. **Login** - Telefon raqam bilan kirish
2. **Shifokorlar** - Avtomatik Supabasedan yuklanadi
3. **Navbat olish** - Shifokorni tanlash, sana va vaqt belgilash
4. **Navbat holati** - Telefon raqamiga ko'ra ko'rish

## **Xavfsizlik**

- Row Level Security (RLS)
- Environment variables
- CORS configuration
- Input validation
- Phone number format validation

## **Deploy tayyorligi**

### **GitHubga yuklanadigan fayllar:**
- `index.html` - Frontend
- `package.json` - Dependencies
- `vercel.json` - Vercel konfiguratsiyasi
- `api/` - Backend Serverless Functions
- `database-schema.md` - Database dokumentatsiyasi
- `.env.example` - Environment namunasi
- `README.md` - Dokumentatsiya
- `.gitignore` - Git ignore qoidalari

### **Yuklanmaydigan fayllar:**
- `.env` - Maxfiy kalitlar
- `node_modules/` - Dependencies
- `backend/` - Eski backend papkasi

## **Performance & Scaling**

-  Vercel CDN - Global caching
-  Serverless Functions - Auto-scaling
-  Supabase - Auto-scaling database
-  Responsive design - Mobile-first

## **Havolalar**

- **Live demo**: https://e-navbat.vercel.app
- **GitHub**: https://github.com/username/e-navbat
- **Supabase**: https://supabase.com
- **Vercel**: https://vercel.com

## **Litsenziya**

MIT License

## **Jamoa**

E-Navbat Team - Professional healthcare IT solutions

---

**Eslatma:** Deploymentdan oldin Supabase project yaratib, environment variables ni sozlang!
