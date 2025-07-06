import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Email template for admin
    const adminEmailTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Custom Jewelry Request</title>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #D4AF37 0%, #8B7355 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #D4AF37; }
            .field-label { font-weight: bold; color: #2C1810; margin-bottom: 5px; }
            .field-value { color: #5D4E37; }
            .priority { background: #fff3cd; border-left-color: #ffc107; }
            .footer { text-align: center; margin-top: 30px; color: #8B7355; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💎 New Custom Jewelry Request</h1>
              <p>Luxe Collections - Premium Hampers & Jewelry</p>
            </div>
            <div class="content">
              <div class="field priority">
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
            </div>
            <div class="footer">
              <p><strong>Action Required:</strong> Please respond within 24 hours with initial consultation details.</p>
              <p>Custom jewelry requests require immediate attention from our master craftsmen.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Email template for customer
    const customerEmailTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Your Custom Jewelry Request - Luxe Collections</title>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #D4AF37 0%, #8B7355 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .message-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #D4AF37; }
            .process-step { background: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 3px solid #8B7355; }
            .footer { text-align: center; margin-top: 30px; color: #8B7355; font-size: 14px; }
            .summary-box { background: #FEFCF9; padding: 20px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ Your Custom Jewelry Journey Begins!</h1>
              <p>Luxe Collections - Premium Hampers & Jewelry</p>
            </div>
            <div class="content">
              <p>Dear ${data.name},</p>
              
              <div class="message-box">
                <h3 style="color: #D4AF37; margin-bottom: 15px;">Thank You for Your Custom Request!</h3>
                <p>We're thrilled that you've chosen Luxe Collections to create your custom ${data.jewelryType.toLowerCase()}. Our master craftsmen are excited to bring your vision to life with meticulous attention to detail and exceptional artistry.</p>
              </div>

              <div class="summary-box">
                <h3 style="color: #2C1810; margin-bottom: 15px;">Your Request Summary:</h3>
                <p><strong>Jewelry Type:</strong> ${data.jewelryType}</p>
                <p><strong>Material:</strong> ${data.material}</p>
                <p><strong>Budget Range:</strong> ${data.budget || 'To be discussed'}</p>
                <p><strong>Timeline:</strong> ${data.timeline || 'To be determined'}</p>
                <p><strong>Occasion:</strong> ${data.occasion || 'Special moment'}</p>
              </div>

              <div class="message-box">
                <h3 style="color: #D4AF37; margin-bottom: 15px;">What Happens Next?</h3>
                
                <div class="process-step">
                  <strong>Step 1 - Consultation (24-48 hours):</strong> Our design team will review your requirements and contact you to discuss details, pricing, and timeline.
                </div>
                
                <div class="process-step">
                  <strong>Step 2 - Design Phase (3-5 days):</strong> We'll create detailed sketches and 3D renderings for your approval.
                </div>
                
                <div class="process-step">
                  <strong>Step 3 - Crafting (2-4 weeks):</strong> Our master jewelers will handcraft your piece with precision and care.
                </div>
                
                <div class="process-step">
                  <strong>Step 4 - Quality Check & Delivery:</strong> Final inspection and careful packaging for delivery to your door.
                </div>
              </div>

              <div class="message-box">
                <h3 style="color: #D4AF37; margin-bottom: 15px;">Your Design Vision:</h3>
                <p style="font-style: italic; color: #5D4E37;">"${data.description}"</p>
              </div>

              <div class="message-box">
                <h3 style="color: #D4AF37; margin-bottom: 15px;">Contact Information</h3>
                <p>Our design team will be in touch soon, but if you have any immediate questions:</p>
                <p><strong>Email:</strong> custom@luxecollections.com</p>
                <p><strong>Phone:</strong> +1 (234) 567-890</p>
                <p><strong>WhatsApp:</strong> +1 (234) 567-890</p>
              </div>
            </div>
            <div class="footer">
              <p>Thank you for choosing Luxe Collections for your custom jewelry!</p>
              <p>Creating extraordinary pieces, one design at a time.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Simulate email sending
    console.log('Sending admin email to: custom@luxecollections.com');
    console.log('Admin Email Content:', adminEmailTemplate);
    
    console.log(`Sending customer email to: ${data.email}`);
    console.log('Customer Email Content:', customerEmailTemplate);

    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ 
      success: true, 
      message: 'Custom jewelry request emails sent successfully' 
    });

  } catch (error) {
    console.error('Error sending custom jewelry emails:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send custom jewelry emails' },
      { status: 500 }
    );
  }
}