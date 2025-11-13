export default {
  async fetch(request, env) {
    // Handle CORS for preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const formData = await request.formData();
      
      // Extract form data
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const company = formData.get('company') || '';
      const phone = formData.get('phone') || '';
      const service = formData.get('service') || '';
      const message = formData.get('message') || '';

      // Create email content
      const emailContent = `
New Contact Form Submission - Skadoosh Website

From: ${name} (${email})
Company: ${company}
Phone: ${phone}
Service Interest: ${service}

Message:
${message}

---
Submitted on: ${new Date().toLocaleString()}
IP: ${request.headers.get('CF-Connecting-IP') || 'Unknown'}
      `.trim();

      // Send email using Cloudflare's Email Workers API
      const emailResponse = await fetch('https://api.mailgun.net/v3/mg.ska-doosh.com/messages', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa('api:' + env.MAILGUN_API_KEY),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          from: 'Contact Form <noreply@ska-doosh.com>',
          to: 'suyash@ska-doosh.com',
          subject: `New Contact: ${name} - ${service || 'General Inquiry'}`,
          text: emailContent,
          'h:Reply-To': email,
        }),
      });

      if (emailResponse.ok) {
        return new Response(JSON.stringify({ success: true, message: 'Email sent successfully' }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({ success: false, error: 'Failed to send email' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
};