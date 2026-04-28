# E-Navbat Database Schema (Supabase)

## 📊 **Jadvallar (Tables)**

### 1️⃣ **doctors** jadvali
```sql
CREATE TABLE doctors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  specialty VARCHAR(100) NOT NULL,
  available_time VARCHAR(50),
  phone VARCHAR(20),
  email VARCHAR(100),
  experience_years INTEGER DEFAULT 0,
  education TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2️⃣ **appointments** jadvali
```sql
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
  patient_name VARCHAR(255) NOT NULL,
  patient_phone VARCHAR(20) NOT NULL,
  patient_email VARCHAR(100),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  symptoms TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3️⃣ **users** jadvali
```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'patient' CHECK (role IN ('patient', 'doctor', 'admin')),
  date_of_birth DATE,
  gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
  address TEXT,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4️⃣ **working_hours** jadvali
```sql
CREATE TABLE working_hours (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
  day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔑 **Indexlar**

```sql
-- Shifokorlar uchun index
CREATE INDEX idx_doctors_specialty ON doctors(specialty);
CREATE INDEX idx_doctors_active ON doctors(is_active);

-- Navbatlar uchun indexlar
CREATE INDEX idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX idx_appointments_patient_phone ON appointments(patient_phone);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);

-- Foydalanuvchilar uchun indexlar
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

## 📝 **Triggerlar**

```sql
-- Updated_at avtomatik yangilash
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON doctors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 🔐 **RLS (Row Level Security) Policies**

```sql
-- Enable RLS
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE working_hours ENABLE ROW LEVEL SECURITY;

-- Doctors jadvali uchun policies
CREATE POLICY "Doctors are viewable by everyone" ON doctors
    FOR SELECT USING (is_active = true);

CREATE POLICY "Doctors can update their own profile" ON doctors
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Appointments jadvali uchun policies
CREATE POLICY "Users can view their own appointments" ON appointments
    FOR SELECT USING (auth.uid()::text = patient_phone::text);

CREATE POLICY "Users can create appointments" ON appointments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own appointments" ON appointments
    FOR UPDATE USING (auth.uid()::text = patient_phone::text);

-- Users jadvali uchun policies
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid()::text = id::text);
```

## 🎯 **Sample Data**

```sql
-- Sample doctors
INSERT INTO doctors (name, specialty, available_time, phone, email, experience_years, education) VALUES
('Dr. Toshmatov Husniddin', 'Terapevt', '15:00 - 16:00', '+998901234567', 'toshmatov@clinic.uz', 10, 'Toshkent Tibbiyot Akademiyasi'),
('Dr. Akramova Kamola', 'Pediator', '16:00 - 17:00', '+998901234568', 'akramova@clinic.uz', 8, 'Toshkent Pediatriya Instituti'),
('Dr. Karimov Aziz', 'Xirurg', '09:00 - 10:00', '+998901234569', 'karimov@clinic.uz', 12, 'Toshkent Tibbiyot Akademiyasi'),
('Dr. Rahimova Gulnora', 'Ginekolog', '14:00 - 15:00', '+998901234570', 'rahimova@clinic.uz', 7, 'Toshkent Tibbiyot Akademiyasi'),
('Dr. Umarov Bekzod', 'Nevropatolog', '17:00 - 18:00', '+998901234571', 'umarov@clinic.uz', 9, 'Toshkent Tibbiyot Akademiyasi');

-- Sample working hours
INSERT INTO working_hours (doctor_id, day_of_week, start_time, end_time) VALUES
((SELECT id FROM doctors WHERE name = 'Dr. Toshmatov Husniddin'), 1, '09:00:00', '18:00:00'),
((SELECT id FROM doctors WHERE name = 'Dr. Toshmatov Husniddin'), 2, '09:00:00', '18:00:00'),
((SELECT id FROM doctors WHERE name = 'Dr. Toshmatov Husniddin'), 3, '09:00:00', '18:00:00'),
((SELECT id FROM doctors WHERE name = 'Dr. Toshmatov Husniddin'), 4, '09:00:00', '18:00:00'),
((SELECT id FROM doctors WHERE name = 'Dr. Toshmatov Husniddin'), 5, '09:00:00', '18:00:00');
```

## 📱 **API Endpointlar uchun Views**

```sql
-- Shifokorlar va ularning navbatlari soni
CREATE VIEW doctor_appointments_count AS
SELECT 
    d.id,
    d.name,
    d.specialty,
    d.available_time,
    COUNT(a.id) as appointment_count,
    d.is_active
FROM doctors d
LEFT JOIN appointments a ON d.id = a.doctor_id AND a.status != 'cancelled'
GROUP BY d.id, d.name, d.specialty, d.available_time, d.is_active;

-- Bugungi navbatlar
CREATE VIEW today_appointments AS
SELECT 
    a.*,
    d.name as doctor_name,
    d.specialty
FROM appointments a
JOIN doctors d ON a.doctor_id = d.id
WHERE a.appointment_date = CURRENT_DATE
ORDER BY a.appointment_time;
```

## 🔗 **Supabase Connection String**

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 📋 **Environment Variables**

```env
# Supabase
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# JWT Secret (Supabase dan olinadi)
JWT_SECRET=your-jwt-secret

# Vercel
NODE_ENV=production
PORT=3000
```
