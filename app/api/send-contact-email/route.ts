import { NextRequest, NextResponse } from 'next/server';
import { sendDualEmails } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Admin email content
    const adminContent = `
      <h2>🎁 New Contact Form Submission</h2>
      <div class="field">
        <div class="field-label">Name:</div>
        <div class="field-value">${data.name}</div>
      </div>
      <div class="field">
        <div class="field-label">Email:</div>
        <div class="field-value">${data.email}</div>
      </div>
      <div class="field">
        <div class="field-label">Phone:</div>
        <div class="field-value">${data.phone || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Product Interest:</div>
        <div class="field-value">${data.productInterest || 'Not specified'}</div>
      </div>
      <div class="field">
        <div class="field-label">Subject:</div>
        <div class="field-value">${data.subject}</div>
      </div>
      <div class="field">
        <div class="field-label">Message:</div>
        <div class="field-value">${data.message}</div>
      </div>
      <p><strong>Action Required:</strong> Please respond within 24 hours for the best customer experience.</p>
    `;

    // Customer email content
    const customerContent = `
      <h2>✨ Thank You for Contacting Us!</h2>
      <p>Dear ${data.name},</p>
      
      <div class="field">
        <p>Thank you for contacting Luxe Collections! We've received your message and our team will get back to you within 24 hours with personalized recommendations and answers to your questions.</p>
      </div>

      <p><strong>Your Message Summary:</strong></p>
      <div class="field">
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Product Interest:</strong> ${data.productInterest || 'General inquiry'}</p>
        <p><strong>Message:</strong> ${data.message}</p>
      </div>

      <div class="field">
        <h3 style="color: #D4AF37; margin-bottom: 15px;">Contact Information</h3>
        <p><strong>Email:</strong> info@luxecollections.com</p>
        <p><strong>Phone:</strong> +1 (234) 567-890</p>
        <p><strong>WhatsApp:</strong> +1 (234) 567-890</p>
        <p><strong>Hours:</strong> Monday-Friday 9AM-6PM</p>
      </div>

      <p>In the meantime, feel free to browse our collections:</p>
      <ul>
        <li>🍫 <strong>Premium Hampers:</strong> Curated chocolate and gourmet collections</li>
        <li>💎 <strong>Handcrafted Jewelry:</strong> Elegant pieces for special moments</li>
        <li>💍 <strong>Engagement Collections:</strong> Perfect for proposals</li>
        <li>🎨 <strong>Custom Creations:</strong> Personalized designs just for you</li>
      </ul>
    `;

    const result = await sendDualEmails(
      data.email,
      'New Contact Form Submission - Luxe Collections',
      adminContent,
      'Thank You for Contacting Luxe Collections',
      customerContent
    );

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Emails sent successfully' 
      });
    } else {
      throw new Error('Failed to send emails');
    }

  } catch (error) {
    console.error('Error sending contact emails:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send emails' },
      { status: 500 }
    );
  }
}