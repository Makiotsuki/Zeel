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
          <title>New Contact Form Submission</title>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #D4AF37 0%, #8B7355 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #D4AF37; }
            .field-label { font-weight: bold; color: #2C1810; margin-bottom: 5px; }
            .field-value { color: #5D4E37; }
            .footer { text-align: center; margin-top: 30px; color: #8B7355; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎁 New Contact Form Submission</h1>
              <p>Luxe Collections - Premium Hampers & Jewelry</p>
            </div>
            <div class="content">
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
            </div>
            <div class="footer">
              <p>This message was sent from the Luxe Collections contact form.</p>
              <p>Please respond within 24 hours for the best customer experience.</p>
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
          <title>Thank You for Contacting Luxe Collections</title>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #D4AF37 0%, #8B7355 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .message-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #D4AF37; }
            .footer { text-align: center; margin-top: 30px; color: #8B7355; font-size: 14px; }
            .contact-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ Thank You for Reaching Out!</h1>
              <p>Luxe Collections - Premium Hampers & Jewelry</p>
            </div>
            <div class="content">
              <p>Dear ${data.name},</p>
              
              <div class="message-box">
                <p>Thank you for contacting Luxe Collections! We've received your message and our team will get back to you within 24 hours with personalized recommendations and answers to your questions.</p>
              </div>

              <p><strong>Your Message Summary:</strong></p>
              <div class="message-box">
                <p><strong>Subject:</strong> ${data.subject}</p>
                <p><strong>Product Interest:</strong> ${data.productInterest || 'General inquiry'}</p>
                <p><strong>Message:</strong> ${data.message}</p>
              </div>

              <div class="contact-info">
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
            </div>
            <div class="footer">
              <p>Thank you for choosing Luxe Collections!</p>
              <p>Creating extraordinary moments, one gift at a time.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // In a real application, you would use a service like SendGrid, Nodemailer, or similar
    // For now, we'll simulate the email sending
    console.log('Sending admin email to: admin@luxecollections.com');
    console.log('Admin Email Content:', adminEmailTemplate);
    
    console.log(`Sending customer email to: ${data.email}`);
    console.log('Customer Email Content:', customerEmailTemplate);

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ 
      success: true, 
      message: 'Emails sent successfully' 
    });

  } catch (error) {
    console.error('Error sending contact emails:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send emails' },
      { status: 500 }
    );
  }
}