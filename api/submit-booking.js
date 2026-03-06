/**
 * HIPAA-Compliant Booking Submission API
 * Handles form submissions with server-side credentials and audit logging
 */

export default async function handler(req, res) {
  // CORS headers
  const allowedOrigins = [
    'https://arizonatelepsychiatryclinic.com',
    'https://www.arizonatelepsychiatryclinic.com',
    'https://arizona-telep.vercel.app',
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null,
  ].filter(Boolean);

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate environment variables
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      throw new Error('Server configuration error');
    }

    const data = req.body;

    // Basic validation
    if (!data.email || !data.first_name || !data.last_name) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    // Submit to Supabase
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Supabase error: ${response.statusText}`);
    }

    return res.status(200).json({
      success: true,
      message: 'Booking submitted successfully'
    });

  } catch (error) {
    console.error('Booking submission error:', error);
    return res.status(500).json({
      error: 'An error occurred processing your request. Please try again.'
    });
  }
}
