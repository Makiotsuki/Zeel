import { NextRequest, NextResponse } from 'next/server';
import { sendDualEmails } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Admin email content
    const adminContent = `
      <h2>🎨 New Custom Builder Quote Request</h2>
      <div class="field" style="background: #fff3cd; border-left-color: #ffc107;">
        <div class="field-label">⚡ Priority Request</div>
        <div class="field-value">Custom ${data.category.toLowerCase()} design consultation required</div>
      </div>
      
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
      <div class="field" style="border-left-color: #8B7355;">
        <h3 style="color: #2C1810; margin-bottom: 15px;">Selected Items:</h3>
        ${data.selectedItems.map(item => `
          <div style="background: #FEFCF9; padding: 10px; margin: 8px 0; border-radius: 5px;">
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
      <div style="background: #D4AF37; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
        <h2 style="margin: 0;">Total Estimated Price: $${data.totalPrice}</h2>
      </div>
      ` : ''}
      
      <p><strong>Action Required:</strong> Please prepare a detailed quote and respond within 24 hours.</p>
      <p>Custom builder requests require immediate attention and personalized pricing.</p>
    `;

    // Customer email content
    const customerContent = `
      <h2>🎨 Your Custom Creation Awaits!</h2>
      <p>Dear Valued Customer,</p>
      
      <div class="field">
        <h3 style="color: #D4AF37; margin-bottom: 15px;">Thank You for Your Custom Request!</h3>
        <p>We're excited to help you create the perfect custom ${data.category.toLowerCase()} that reflects your unique vision and style. Our team is already working on preparing a detailed quote for your personalized creation.</p>
      </div>

      ${data.selectedItems && data.selectedItems.length > 0 ? `
      <div class="field" style="background: #FEFCF9;">
        <h3 style="color: #2C1810; margin-bottom: 15px;">Your Selected Items:</h3>
        ${data.selectedItems.map(item => `
          <div style="background: white; padding: 10px; margin: 8px 0; border-radius: 5px; border-left: 3px solid #8B7355;">
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
      <div class="field">
        <h3 style="color: #D4AF37; margin-bottom: 15px;">Your Customization Preferences:</h3>
        ${data.customization.message ? `<p><strong>Personal Message:</strong> "${data.customization.message}"</p>` : ''}
        <p><strong>Packaging:</strong> ${data.customization.packaging}</p>
        <p><strong>Delivery:</strong> ${data.customization.delivery}</p>
      </div>
      ` : ''}

      <div class="field">
        <h3 style="color: #D4AF37; margin-bottom: 15px;">What Happens Next?</h3>
        
        <div style="margin: 15px 0; padding: 10px; background: #FEFCF9; border-radius: 5px;">
          <strong>Step 1 - Quote Preparation (24 hours):</strong> Our team will prepare a detailed quote with final pricing, timeline, and any additional options.
        </div>
        
        <div style="margin: 15px 0; padding: 10px; background: #FEFCF9; border-radius: 5px;">
          <strong>Step 2 - Quote Review:</strong> We'll send you a comprehensive quote via email for your review and approval.
        </div>
        
        <div style="margin: 15px 0; padding: 10px; background: #FEFCF9; border-radius: 5px;">
          <strong>Step 3 - Creation Process:</strong> Once approved, we'll begin crafting your custom piece with meticulous attention to detail.
        </div>
        
        <div style="margin: 15px 0; padding: 10px; background: #FEFCF9; border-radius: 5px;">
          <strong>Step 4 - Quality & Delivery:</strong> Final quality check and careful packaging for delivery to your door.
        </div>
      </div>

      <div class="field">
        <h3 style="color: #D4AF37; margin-bottom: 15px;">Contact Information</h3>
        <p>Our custom creation team will be in touch soon, but if you have any immediate questions:</p>
        <p><strong>Email:</strong> custom@luxecollections.com</p>
        <p><strong>Phone:</strong> +1 (234) 567-890</p>
        <p><strong>WhatsApp:</strong> +1 (234) 567-890</p>
        <p><strong>Hours:</strong> Monday-Friday 9AM-6PM</p>
      </div>
    `;

    const result = await sendDualEmails(
      data.customerEmail || 'customer@example.com',
      'New Custom Builder Quote Request - Luxe Collections',
      adminContent,
      'Your Custom Quote Request - Luxe Collections',
      customerContent
    );

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Custom builder quote request emails sent successfully' 
      });
    } else {
      throw new Error('Failed to send emails');
    }

  } catch (error) {
    console.error('Error sending custom builder emails:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send custom builder emails' },
      { status: 500 }
    );
  }
}