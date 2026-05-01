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
        'apikey': 'TU_ANON_KEY',
        'Authorization': 'Bearer TU_ANON_KEY',
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
