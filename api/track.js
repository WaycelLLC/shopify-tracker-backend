export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { event, url, timestamp } = req.body;

    const supabaseResponse = await fetch('https://cvmkonpbmpubskobzbqc.supabase.co/rest/v1/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2bWtvbnBibXB1YnNrb2J6YnFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2NTA4NTAsImV4cCI6MjA5MzIyNjg1MH0.XQRFTqzIVVCWAs6OXcYxtKK4CkjH37H7WiXLk-gfYD8',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2bWtvbnBibXB1YnNrb2J6YnFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2NTA4NTAsImV4cCI6MjA5MzIyNjg1MH0.XQRFTqzIVVCWAs6OXcYxtKK4CkjH37H7WiXLk-gfYD8',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        event,
        url,
        timestamp
      })
    });

    const result = await supabaseResponse.text();

    console.log('SUPABASE STATUS:', supabaseResponse.status);
    console.log('SUPABASE RESULT:', result);

    if (!supabaseResponse.ok) {
      return res.status(500).json({
        ok: false,
        supabaseStatus: supabaseResponse.status,
        supabaseResult: result
      });
    }

    return res.status(200).json({ ok: true, result });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
