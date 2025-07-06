import { NextRequest, NextResponse } from 'next/server';
import { sendDualEmails } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Admin email content
    const adminContent = `
      <h2>💎 New Custom Jewelry Request</h2>
      <div class="field" style="background: #fff3cd; border-left-color: #ffc107;">
        <div class="field-label">⚡ Priority Request</div>
        <div class="field-value">Custom jewelry design consultation required</div>
      </div>
      
      <div class="field">
        <div class="field-label">Customer Name:</div>
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
        <div class="field-label">Jewelry Type:</div>
        <div class="field-value">${data.jewelryType}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Preferred Material:</div>
        <div class="field-value">${data.material}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Budget Range:</div>
        <div class="field-value">${data.budget || 'Not specified'}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Occasion:</div>
        <div class="field-value">${data.occasion || 'Not specified'}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Timeline:</div>
        <div class="field-value">${data.timeline || 'Not specified'}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Design Description:</div>
        <div class="field-value">${data.description}</div>
      </div>
      
      <p><strong>Action Required:</strong> Please respond within 24 hours with initial consultation details.</p>
      <p>Custom jewelry requests require immediate attention from our master craftsmen.</p>
    `;

    // Customer email content
    const customerContent = `
      <h2>✨ Your Custom Jewelry Journey Begins!</h2>
      <p>Dear ${data.name},</p>
      
      <div class="field">
        <h3 style="color: #D4AF37; margin-bottom: 15px;">Thank You for Your Custom Request!</h3>
        <p>We're thrilled that you've chosen Luxe Collections to create your custom ${data.jewelryType.toLowerCase()}. Our master craftsmen are excited to bring your vision to life with meticulous attention to detail and exceptional artistry.</p>
      </div>

      <div class="field" style="background: #FEFCF9;">
        <h3 style="color: #2C1810; margin-bottom: 15px;">Your Request Summary:</h3>
        <p><strong>Jewelry Type:</strong> ${data.jewelryType}</p>
        <p><strong>Material:</strong> ${data.material}</p>
        <p><strong>Budget Range:</strong> ${data.budget || 'To be discussed'}</p>
        <p><strong>Timeline:</strong> ${data.timeline || 'To be determined'}</p>
        <p><strong>Occasion:</strong> ${data.occasion || 'Special moment'}</p>
      </div>

      <div class="field">
        <h3 style="color: #D4AF37; margin-bottom: 15px;">What Happens Next?</h3>
        
        <div style="margin: 15px 0; padding: 10px; background: #FEFCF9; border-radius: 5px;">
          <strong>Step 1 - Consultation (24-48 hours):</strong> Our design team will review your requirements and contact you to discuss details, pricing, and timeline.
        </div>
        
        <div style="margin: 15px 0; padding: 10px; background: #FEFCF9; border-radius: 5px;">
          <strong>Step 2 - Design Phase (3-5 days):</strong> We'll create detailed sketches and 3D renderings for your approval.
        </div>
        
        <div style="margin: 15px 0; padding: 10px; background: #FEFCF9; border-radius: 5px;">
          <strong>Step 3 - Crafting (2-4 weeks):</strong> Our master jewelers will handcraft your piece with precision and care.
        </div>
        
        <div style="margin: 15px 0; padding: 10px; background: #FEFCF9; border-radius: 5px;">
          <strong>Step 4 - Quality Check & Delivery:</strong> Final inspection and careful packaging for delivery to your door.
        </div>
      </div>

      <div class="field">
        <h3 style="color: #D4AF37; margin-bottom: 15px;">Your Design Vision:</h3>
        <p style="font-style: italic; color: #5D4E37;">"${data.description}"</p>
      </div>

      <div class="field">
        <h3 style="color: #D4AF37; margin-bottom: 15px;">Contact Information</h3>
        <p>Our design team will be in touch soon, but if you have any immediate questions:</p>
        <p><strong>Email:</strong> custom@luxecollections.com</p>
        <p><strong>Phone:</strong> +1 (234) 567-890</p>
        <p><strong>WhatsApp:</strong> +1 (234) 567-890</p>
      </div>
    `;

    const result = await sendDualEmails(
      data.email,
      'New Custom Jewelry Request - Luxe Collections',
      adminContent,
      'Your Custom Jewelry Request - Luxe Collections',
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