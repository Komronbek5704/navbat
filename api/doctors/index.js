import { db, supabaseAdmin } from '../lib/supabase.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        // Barcha faol shifokorlarni olish
        const doctors = await db.getDoctors();
        res.status(200).json(doctors);
        break;

      case 'POST':
        // Yangi shifokor qo'shish (admin uchun)
        const { name, specialty, available_time, phone, email, experience_years, education } = req.body;

        if (!name || !specialty) {
          return res.status(400).json({ 
            error: 'Ism va mutaxassislik kiritilishi shart' 
          });
        }

        // Bu yerda admin authentication kerak bo'ladi
        const newDoctor = await supabaseAdmin
          .from('doctors')
          .insert([{
            name,
            specialty,
            available_time,
            phone,
            email,
            experience_years,
            education
          }])
          .select()
          .single();

        res.status(201).json(newDoctor.data);
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Doctors API Error:', error);
    res.status(500).json({ 
      error: 'Server xatosi',
      message: error.message 
    });
  }
}
