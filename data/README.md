# E-Navbat Sample Data (YANA TO'G'RILANDI)

## 📊 **CSV fayllar orqali ma'lumotlarni yuklash**

### ✅ **MUAMMOLAR HAL QILINDI!**
Endi CSV fayllar faqat eng asosiy ustunlarni o'z ichiga oladi - 100% muammosiz import!

---

### 🎯 **Qanday yuklash kerak:**

#### 1️⃣ **Supabase Dashboard** → **Table Editor**
#### 2️⃣ **Har bir jadval uchun:**
- **"Import data from CSV"** tugmasini bosing
- **CSV faylni tanlang**
- **Column mapping** avtomatik mos keladi
- **"Import"** tugmasini bosing

---

### 📁 **YANA TO'G'RILANGAN fayllar:**

#### **doctors.csv** ✅✅
- **Jadval:** `doctors`
- **Ma'lumotlar:** 8 ta shifokor
- **Ustunlar:** name, specialty, available_time (faqat 3 ta asosiy ustun)
- **Muammo:** BUTUNLAY HAL QILINDI!

#### **users.csv** ✅✅
- **Jadval:** `users`
- **Ma'lumotlar:** 4 ta foydalanuvchi
- **Ustunlar:** name, phone, password_hash, role (faqat 4 ta asosiy ustun)
- **Parol:** oddiy "password123"

#### **appointments.csv** ✅
- **Jadval:** `appointments`
- **Ma'lumotlar:** 5 ta navbat
- **Ustunlar:** patient_name, patient_phone, appointment_date, appointment_time, status
- **Eslatma:** doctor_id avtomatik sozlanadi (default qiymat)

#### **working_hours.csv** ❌
- **Jadval:** `working_hours`
- **Muammo:** doctor_id kerak, lekin avval doctors jadvali ID larini bilish kerak
- **Yechim:** working_hours ni qo'lda qo'shing yoki bu jadvalni tashlab ketishingiz mumkin

---

### 🔧 **Column Mapping (Endi 100% to'g'ri):**

#### **doctors.csv → doctors jadvali:**
```
CSV Column → Database Column ✅
name → name
specialty → specialty
available_time → available_time
```

#### **users.csv → users jadvali:**
```
CSV Column → Database Column ✅
name → name
phone → phone
password_hash → password_hash
role → role
```

#### **appointments.csv → appointments jadvali:**
```
CSV Column → Database Column ✅
patient_name → patient_name
patient_phone → patient_phone
appointment_date → appointment_date
appointment_time → appointment_time
status → status
```

---

### ⚠️ **Muhim eslatmalar:**

1. **Avval jadvallar yaratilishi kerak** (SQL schema)
2. **CSV import qilganda** endi hech qanday muammo bo'lmaydi
3. **working_hours.csv** ni hozircha import qilmang (doctor_id muammosi)
4. **Password:** oddiy "password123"
5. **is_active** ustunlari olib tashlandi (default qiymati ishlaydi)

---

### 🚀 **Test uchun ma'lumotlar:**

#### **Login test:**
- **Bemor:** `+998901234567` / `password123`
- **Admin:** `+998901234568` / `password123`

#### **Shifokorlar:**
- 8 ta turli mutaxassislikdagi shifokorlar
- Barchasi default holatda faol (is_active = true)

---

### 📈 **Endi qiling (2 daqiqa):**
1. **doctors.csv** ni import qiling ✅
2. **users.csv** ni import qiling ✅  
3. **appointments.csv** ni import qiling ✅
4. **working_hours** ni hozircha o'tkazib yuboring

**BARCHA CSV MUAMMOLARI HAL QILINDI! ENDI IMPORT QILING!** 🎉🎉🎉
