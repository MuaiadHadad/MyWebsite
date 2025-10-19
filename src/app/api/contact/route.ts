// api/contact/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Instantiate Resend client at runtime, not at module load time
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send notification email to you
    await resend.emails.send({
      from: 're.replay@muaiadhadad.me',
      to: 'muaiad@muaiadhadad.me',
      subject: `New Contact Form Message: ${subject || 'No Subject'}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a0a0a; color: #e5e5e5;">
          <div style="border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 24px; background: linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0.02));">
            <h2 style="color: #6ee7b7; margin-top: 0; font-size: 24px; font-weight: 800;">New Contact Form Submission</h2>
            
            <div style="margin: 20px 0; padding: 16px; background: rgba(0,0,0,0.3); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
              <p style="margin: 8px 0; color: #d4d4d4;"><strong style="color: #a3a3a3;">From:</strong> ${name}</p>
              <p style="margin: 8px 0; color: #d4d4d4;"><strong style="color: #a3a3a3;">Email:</strong> <a href="mailto:${email}" style="color: #6ee7b7; text-decoration: none;">${email}</a></p>
              <p style="margin: 8px 0; color: #d4d4d4;"><strong style="color: #a3a3a3;">Subject:</strong> ${subject || 'No Subject'}</p>
            </div>

            <div style="margin: 20px 0;">
              <h3 style="color: #a3a3a3; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">Message:</h3>
              <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 16px;">
                <p style="margin: 0; color: #e5e5e5; white-space: pre-wrap; line-height: 1.6;">${message}</p>
              </div>
            </div>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
              <p style="margin: 0; font-size: 12px; color: #737373;">
                Sent from your website contact form at ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Lisbon' })}
              </p>
            </div>
          </div>
        </div>
      `,
    });

    // Send auto-reply to the sender
    await resend.emails.send({
      from: 're.replay@muaiadhadad.me',
      to: email,
      subject: 'Thank you for reaching out!',
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a0a0a; color: #e5e5e5;">
          <div style="border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 24px; background: linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0.02));">
            <h2 style="color: #6ee7b7; margin-top: 0; font-size: 24px; font-weight: 800;">Thanks for getting in touch!</h2>
            
            <p style="color: #d4d4d4; line-height: 1.7; margin: 16px 0;">Hi ${name},</p>
            
            <p style="color: #d4d4d4; line-height: 1.7; margin: 16px 0;">
              Thank you for reaching out through my website. I've received your message and will get back to you as soon as possible.
            </p>

            <div style="margin: 24px 0; padding: 16px; background: rgba(16, 185, 129, 0.1); border-radius: 12px; border: 1px solid rgba(110, 231, 183, 0.2);">
              <p style="margin: 0; color: #6ee7b7; font-weight: 600;">Your message:</p>
              <p style="margin: 12px 0 0 0; color: #d4d4d4; white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>

            <p style="color: #d4d4d4; line-height: 1.7; margin: 16px 0;">
              I typically respond within 24-48 hours. If your inquiry is urgent, feel free to reach me directly at <a href="mailto:muaiad@muaiadhadad.me" style="color: #6ee7b7; text-decoration: none;">muaiad@muaiadhadad.me</a>.
            </p>

            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
              <p style="margin: 0 0 8px 0; color: #e5e5e5; font-weight: 600;">Best regards,<br>Muaiad Hadad</p>
              <p style="margin: 8px 0 0 0; font-size: 14px; color: #737373;">
                <a href="https://muaiadhadad.me" style="color: #6ee7b7; text-decoration: none;">muaiadhadad.me</a> | 
                <a href="https://github.com/MuaiadHadad" style="color: #6ee7b7; text-decoration: none;">GitHub</a> | 
                <a href="https://www.linkedin.com/in/muaiad-hadad/" style="color: #6ee7b7; text-decoration: none;">LinkedIn</a>
              </p>
            </div>
          </div>

          <div style="text-align: center; margin-top: 16px;">
            <p style="margin: 0; font-size: 12px; color: #525252;">
              This is an automated response. Please do not reply to this email.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
