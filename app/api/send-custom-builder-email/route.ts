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
          <title>New Custom Builder Quote Request</title>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #D4AF37 0%, #8B7355 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 15px; padding: 12px; background: white; border-radius: 8px; border-left: 4px solid #D4AF37; }
            .field-label { font-weight: bold; color: #2C1810; margin-bottom: 5px; }
            .field-value { color: #5D4E37; }
            .items-section { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8B7355; }
            .item { background: #FEFCF9; padding: 10px; margin: 8px 0; border-radius: 5px; }
            .total-section { background: #D4AF37; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #8B7355; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎨 New Custom Builder Quote Request</h1>
              <p>Luxe Collections - Premium Hampers & Jewelry</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">Customer Name:</div>
                <div class="field-value">${data.customerName || 'Not provided'}</div>
              </div>
              
              <div class="field">
                <div class="field-label">Email:</div>
                <div class="field-value">${data.customerEmail || 'Not provided'}</div>
              </div>
              
              <div class="field">
                <div class="field-label">Category:</div>
                <div class="field-value">${data.category}</div>
              </div>

              ${data.selectedItems && data.selectedItems.length > 0 ? `
              <div class="items-section">
                <h3 style="color: #2C1810; margin-bottom: 15px;">Selected Items:</h3>
                ${data.selectedItems.map(item => `
                  <div class="item">
                    <strong>${item.name}</strong> - Quantity: ${item.quantity} - $${item.price * item.quantity}
                  </div>
                `).join('')}
              </div>
              ` : ''}

              ${data.customization ? `
              <div class="field">
                <div class="field-label">Personal Message:</div>
                <div class="field-value">${data.customization.message || 'None'}</div>
              </div>
              
              <div class="field">
                <div class="field-label">Packaging:</div>
                <div class="field-value">${data.customization.packaging}</div>
              </div>
              
              <div class="field">
                <div class="field-label">Delivery:</div>
                <div class="field-value">${data.customization.delivery}</div>
              </div>
              ` : ''}

              ${data.totalPrice ? `
              <div class="total-section">
                <h2 style="margin: 0;">Total Estimated Price: $${data.totalPrice}</h2>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p><strong>Action Required:</strong> Please prepare a detailed quote and respond within 24 hours.</p>
              <p>Custom builder requests require immediate attention and personalized pricing.</p>
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
          <title>Your Custom Quote Request - Luxe Collections</title>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #D4AF37 0%, #8B7355 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .message-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #D4AF37; }
            .items-summary { background: #FEFCF9; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .item { background: white; padding: 10px; margin: 8px 0; border-radius: 5px; border-left: 3px solid #8B7355; }
            .next-steps { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .step { margin: 15px 0; padding: 10px; background: #FEFCF9; border-radius: 5px; }
            .footer { text-align: center; margin-top: 30px; color: #8B7355; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎨 Your Custom Creation Awaits!</h1>
              <p>Luxe Collections - Premium Hampers & Jewelry</p>
            </div>
            <div class="content">
              <p>Dear Valued Customer,</p>
              
              <div class="message-box">
                <h3 style="color: #D4AF37; margin-bottom: 15px;">Thank You for Your Custom Request!</h3>
                <p>We're excited to help you create the perfect custom ${data.category.toLowerCase()} that reflects your unique vision and style. Our team is already working on preparing a detailed quote for your personalized creation.</p>
              </div>

              ${data.selectedItems && data.selectedItems.length > 0 ? `
              <div class="items-summary">
                <h3 style="color: #2C1810; margin-bottom: 15px;">Your Selected Items:</h3>
                ${data.selectedItems.map(item => `
                  <div class="item">
                    <strong>${item.name}</strong><br>
                    Quantity: ${item.quantity} | Price: $${item.price * item.quantity}
                  </div>
                `).join('')}
                ${data.totalPrice ? `
                <div style="text-align: center; margin-top: 20px; padding: 15px; background: linear-gradient(135deg, #D4AF37 0%, #8B7355 100%); color: white; border-radius: 8px;">
                  <strong>Estimated Total: $${data.totalPrice}</strong>
                </div>
                ` : ''}
              </div>
              ` : ''}

              ${data.customization ? `
              <div class="message-box">
                <h3 style="color: #D4AF37; margin-bottom: 15px;">Your Customization Preferences:</h3>
                ${data.customization.message ? `<p><strong>Personal Message:</strong> "${data.customization.message}"</p>` : ''}
                <p><strong>Packaging:</strong> ${data.customization.packaging}</p>
                <p><strong>Delivery:</strong> ${data.customization.delivery}</p>
              </div>
              ` : ''}

              <div class="next-steps">
                <h3 style="color: #D4AF37; margin-bottom: 15px;">What Happens Next?</h3>
                
                <div class="step">
                  <strong>Step 1 - Quote Preparation (24 hours):</strong> Our team will prepare a detailed quote with final pricing, timeline, and any additional options.
                </div>
                
                <div class="step">
                  <strong>Step 2 - Quote Review:</strong> We'll send you a comprehensive quote via email for your review and approval.
                </div>
                
                <div class="step">
                  <strong>Step 3 - Creation Process:</strong> Once approved, we'll begin crafting your custom piece with meticulous attention to detail.
                </div>
                
                <div class="step">
                  <strong>Step 4 - Quality & Delivery:</strong> Final quality check and careful packaging for delivery to your door.
                </div>
              </div>

              <div class="message-box">
                <h3 style="color: #D4AF37; margin-bottom: 15px;">Contact Information</h3>
                <p>Our custom creation team will be in touch soon, but if you have any immediate questions:</p>
                <p><strong>Email:</strong> custom@luxecollections.com</p>
                <p><strong>Phone:</strong> +1 (234) 567-890</p>
                <p><strong>WhatsApp:</strong> +1 (234) 567-890</p>
                <p><strong>Hours:</strong> Monday-Friday 9AM-6PM</p>
              </div>
            </div>
            <div class="footer">
              <p>Thank you for choosing Luxe Collections for your custom creation!</p>
              <p>Bringing your vision to life, one masterpiece at a time.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Simulate email sending
    console.log('Sending admin email to: custom@luxecollections.com');
    console.log('Admin Email Content:', adminEmailTemplate);
    
    if (data.customerEmail) {
      console.log(`Sending customer email to: ${data.customerEmail}`);
      console.log('Customer Email Content:', customerEmailTemplate);
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ 
      success: true, 
      message: 'Custom builder quote request emails sent successfully' 
    });

  } catch (error) {
    console.error('Error sending custom builder emails:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send custom builder emails' },
      { status: 500 }
    );
  }
}