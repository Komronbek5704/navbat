export default function handler(req, res) {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'E-Navbat API is running'
  });
}
