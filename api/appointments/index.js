import { db, supabase } from '../lib/supabase.js';

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
      case 'POST':
        // Yangi navbat olish
        const { 
          doctor_id, 
          patient_name, 
          patient_phone, 
          patient_email,
          appointment_date,
          appointment_time,
          symptoms,
          notes 
        } = req.body;

        // Validation
        if (!doctor_id || !patient_name || !patient_phone || !appointment_date || !appointment_time) {
          return res.status(400).json({ 
            error: 'Barcha maydonlar to\'ldirilishi shart' 
          });
        }

        // Telefon raqam formatini tekshirish
        const phoneRegex = /^\+998\d{9}$/;
        if (!phoneRegex.test(patient_phone)) {
          return res.status(400).json({ 
            error: 'Telefon raqami noto\'g\'ri formatda. Masalan: +998901234567' 
          });
        }

        // Vaqt formatini tekshirish
        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(appointment_time)) {
          return res.status(400).json({ 
            error: 'Vaqt noto\'g\'ri formatda. Masalan: 14:30' 
          });
        }

        // Navbat yaratish
        const newAppointment = await db.createAppointment({
          doctor_id,
          patient_name,
          patient_phone,
          patient_email,
          appointment_date,
          appointment_time,
          symptoms: symptoms || '',
          notes: notes || '',
          status: 'pending'
        });

        res.status(201).json({
          id: newAppointment.id,
          message: 'Navbat muvaffaqiyatli olindi',
          appointment: newAppointment
        });
        break;

      case 'GET':
        // Navbatlarni ko'rish
        const { phone, id, status, date } = req.query;

        if (id) {
          // ID bo'yicha navbat
          const appointment = await db.getAppointmentById(id);
          res.status(200).json(appointment);
        } else if (phone) {
          // Telefon raqamiga ko'ra navbatlar
          const userAppointments = await db.getAppointmentsByPhone(phone);
          res.status(200).json(userAppointments);
        } else {
          // Filterlar bilan navbatlar (admin uchun)
          let query = supabase.from('appointments').select(`
            *,
            doctors:doctor_id (
              name,
              specialty,
              phone
            )
          `);

          if (status) {
            query = query.eq('status', status);
          }
          
          if (date) {
            query = query.eq('appointment_date', date);
          }

          const { data, error } = await query.order('created_at', { ascending: false });
          
          if (error) throw error;
          res.status(200).json(data);
        }
        break;

      case 'PUT':
        // Navbatni yangilash
        const { id: updateId, status: newStatus, notes: updateNotes } = req.body;

        if (!updateId) {
          return res.status(400).json({ 
            error: 'Navbat ID si talab qilinadi' 
          });
        }

        const updateData = {};
        if (newStatus) updateData.status = newStatus;
        if (updateNotes !== undefined) updateData.notes = updateNotes;

        const updatedAppointment = await db.updateAppointment(updateId, updateData);
        res.status(200).json({
          message: 'Navbat muvaffaqiyatli yangilandi',
          appointment: updatedAppointment
        });
        break;

      case 'DELETE':
        // Navbatni o'chirish
        const { id: deleteId } = req.query;

        if (!deleteId) {
          return res.status(400).json({ 
            error: 'Navbat ID si talab qilinadi' 
          });
        }

        await db.deleteAppointment(deleteId);
        res.status(200).json({ message: 'Navbat muvaffaqiyatli o\'chirildi' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Appointments API Error:', error);
    res.status(500).json({ 
      error: 'Server xatosi',
      message: error.message 
    });
  }
}
