import { NextRequest, NextResponse } from 'next/server';
import { sendDualEmails } from '@/lib/email';

const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || 'Luxe Collections';
const CUSTOM_EMAIL = process.env.CUSTOM_EMAIL || 'custom@luxecollections.com';
const COMPANY_PHONE = process.env.NEXT_PUBLIC_COMPANY_PHONE || '+1 (234) 567-890';
const COMPANY_WHATSAPP = process.env.NEXT_PUBLIC_COMPANY_WHATSAPP || '+1234567890';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Admin email content with enhanced styling
    const adminContent = `
      <div class="admin-priority">
        <span class="icon">⚡</span>
        <strong>Priority Custom Jewelry Request</strong>
      </div>

      <h2>💎 New Custom Jewelry Request</h2>
      
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
        <div class="field-label">Jewelry Type</div>
        <div class="field-value">${data.jewelryType}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Preferred Material</div>
        <div class="field-value">${data.material}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Budget Range</div>
        <div class="field-value">${data.budget || 'Not specified'}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Occasion</div>
        <div class="field-value">${data.occasion || 'Not specified'}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Timeline</div>
        <div class="field-value">${data.timeline || 'Not specified'}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Design Description</div>
        <div class="field-value">${data.description}</div>
      </div>

      <div class="highlight-box">
        <h3>⏰ Action Required</h3>
        <p>Please respond within 24 hours with initial consultation details. Custom jewelry requests require immediate attention from our master craftsmen.</p>
      </div>
    `;

    // Customer email content with enhanced styling
    const customerContent = `
      <h2>✨ Your Custom Jewelry Journey Begins!</h2>
      <p>Dear <strong>${data.name}</strong>,</p>
      
      <div class="field">
        <h3 style="color: #D4AF37; margin-bottom: 15px;">Thank You for Your Custom Request!</h3>
        <p>We're thrilled that you've chosen <strong>${COMPANY_NAME}</strong> to create your custom ${data.jewelryType.toLowerCase()}. Our master craftsmen are excited to bring your vision to life with meticulous attention to detail and exceptional artistry.</p>
      </div>

      <div class="highlight-box">
        <h3>📋 Your Request Summary</h3>
        <p><strong>Jewelry Type:</strong> ${data.jewelryType}</p>
        <p><strong>Material:</strong> ${data.material}</p>
        <p><strong>Budget Range:</strong> ${data.budget || 'To be discussed'}</p>
        <p><strong>Timeline:</strong> ${data.timeline || 'To be determined'}</p>
        <p><strong>Occasion:</strong> ${data.occasion || 'Special moment'}</p>
      </div>

      <div class="steps-container">
        <h3 style="color: #2C1810; text-align: center; margin-bottom: 30px;">What Happens Next?</h3>
        
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h4>Consultation (24-48 hours)</h4>
            <p>Our design team will review your requirements and contact you to discuss details, pricing, and timeline.</p>
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h4>Design Phase (3-5 days)</h4>
            <p>We'll create detailed sketches and 3D renderings for your approval.</p>
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h4>Crafting (2-4 weeks)</h4>
            <p>Our master jewelers will handcraft your piece with precision and care.</p>
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h4>Quality Check & Delivery</h4>
            <p>Final inspection and careful packaging for delivery to your door.</p>
          </div>
        </div>
      </div>

      <div class="field">
        <h3 style="color: #D4AF37; margin-bottom: 15px;">Your Design Vision</h3>
        <p style="font-style: italic; color: #5D4E37; background: #FEFCF9; padding: 20px; border-radius: 10px; border-left: 4px solid #D4AF37;">"${data.description}"</p>
      </div>

      <div class="contact-info">
        <h3>📞 Contact Information</h3>
        <p style="text-align: center; margin-bottom: 20px;">Our design team will be in touch soon, but if you have any immediate questions:</p>
        <div class="contact-grid">
          <div class="contact-item">
            <strong>Email</strong>
            <a href="mailto:${CUSTOM_EMAIL}">${CUSTOM_EMAIL}</a>
          </div>
          <div class="contact-item">
            <strong>Phone</strong>
            <a href="tel:${COMPANY_PHONE.replace(/\D/g, '')}">${COMPANY_PHONE}</a>
          </div>
          <div class="contact-item">
            <strong>WhatsApp</strong>
            <a href="https://wa.me/${COMPANY_WHATSAPP.replace(/\D/g, '')}">${COMPANY_WHATSAPP}</a>
          </div>
        </div>
      </div>
    `;

    const result = await sendDualEmails(
      data.email,
      `New Custom Jewelry Request - ${COMPANY_NAME}`,
      adminContent,
      `Your Custom Jewelry Request - ${COMPANY_NAME}`,
      customerContent
    );

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Custom jewelry request emails sent successfully' 
      });
    } else {
      throw new Error('Failed to send emails');
    }

  } catch (error) {
    console.error('Error sending custom jewelry emails:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send custom jewelry emails' },
      { status: 500 }
    );
  }
}