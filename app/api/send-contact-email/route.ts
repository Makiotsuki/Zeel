import { NextRequest, NextResponse } from 'next/server';
import { sendDualEmails } from '@/lib/email';

const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || 'Luxe Collections';
const COMPANY_EMAIL = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@luxecollections.com';
const COMPANY_PHONE = process.env.NEXT_PUBLIC_COMPANY_PHONE || '+1 (234) 567-890';
const COMPANY_WHATSAPP = process.env.NEXT_PUBLIC_COMPANY_WHATSAPP || '+1234567890';
const BUSINESS_HOURS = process.env.NEXT_PUBLIC_BUSINESS_HOURS || 'Monday-Friday 9AM-6PM';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Admin email content with enhanced styling
    const adminContent = `
      <div class="admin-priority">
        <span class="icon">⚡</span>
        <strong>Priority Contact Form Submission</strong>
      </div>

      <h2>🎁 New Contact Form Submission</h2>
      
      <div class="field">
        <div class="field-label">Customer Name</div>
        <div class="field-value">${data.name}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Email Address</div>
        <div class="field-value"><a href="mailto:${data.email}" style="color: #D4AF37;">${data.email}</a></div>
      </div>
      
      <div class="field">
        <div class="field-label">Phone Number</div>
        <div class="field-value">${data.phone || 'Not provided'}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Product Interest</div>
        <div class="field-value">${data.productInterest || 'Not specified'}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Subject</div>
        <div class="field-value">${data.subject}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Message</div>
        <div class="field-value">${data.message}</div>
      </div>

      <div class="highlight-box">
        <h3>⏰ Action Required</h3>
        <p>Please respond within 24 hours for the best customer experience. This inquiry shows high engagement and should be prioritized.</p>
      </div>
    `;

    // Customer email content with enhanced styling
    const customerContent = `
      <h2>✨ Thank You for Contacting Us!</h2>
      <p>Dear <strong>${data.name}</strong>,</p>
      
      <div class="field">
        <p>Thank you for contacting <strong>${COMPANY_NAME}</strong>! We've received your message and our dedicated team will get back to you within 24 hours with personalized recommendations and answers to your questions.</p>
      </div>

      <div class="highlight-box">
        <h3>📋 Your Message Summary</h3>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Product Interest:</strong> ${data.productInterest || 'General inquiry'}</p>
        <p><strong>Message:</strong> "${data.message}"</p>
      </div>

      <div class="contact-info">
        <h3>📞 Contact Information</h3>
        <div class="contact-grid">
          <div class="contact-item">
            <strong>Email</strong>
            <a href="mailto:${COMPANY_EMAIL}">${COMPANY_EMAIL}</a>
          </div>
          <div class="contact-item">
            <strong>Phone</strong>
            <a href="tel:${COMPANY_PHONE.replace(/\D/g, '')}">${COMPANY_PHONE}</a>
          </div>
          <div class="contact-item">
            <strong>WhatsApp</strong>
            <a href="https://wa.me/${COMPANY_WHATSAPP.replace(/\D/g, '')}">${COMPANY_WHATSAPP}</a>
          </div>
          <div class="contact-item">
            <strong>Business Hours</strong>
            ${BUSINESS_HOURS}
          </div>
        </div>
      </div>

      <h3 style="color: #D4AF37; text-align: center; margin: 40px 0 20px 0;">Explore Our Collections</h3>
      <div class="collections-grid">
        <div class="collection-item">
          <div class="collection-icon">🍫</div>
          <div class="collection-title">Premium Hampers</div>
          <div class="collection-desc">Curated chocolate and gourmet collections</div>
        </div>
        <div class="collection-item">
          <div class="collection-icon">💎</div>
          <div class="collection-title">Handcrafted Jewelry</div>
          <div class="collection-desc">Elegant pieces for special moments</div>
        </div>
        <div class="collection-item">
          <div class="collection-icon">💍</div>
          <div class="collection-title">Engagement Collections</div>
          <div class="collection-desc">Perfect for proposals</div>
        </div>
        <div class="collection-item">
          <div class="collection-icon">🎨</div>
          <div class="collection-title">Custom Creations</div>
          <div class="collection-desc">Personalized designs just for you</div>
        </div>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="#" class="button">Browse Collections</a>
        <a href="#" class="button">Custom Builder</a>
      </div>
    `;

    const result = await sendDualEmails(
      data.email,
      `New Contact Form Submission - ${COMPANY_NAME}`,
      adminContent,
      `Thank You for Contacting ${COMPANY_NAME}`,
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