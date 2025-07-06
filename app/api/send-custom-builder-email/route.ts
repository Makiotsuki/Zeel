import { NextRequest, NextResponse } from 'next/server';
import { sendDualEmails } from '@/lib/email';

const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || 'Luxe Collections';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Admin email content with enhanced styling
    const adminContent = `
      <div class="admin-priority">
        <span class="icon">⚡</span>
        <strong>Priority Custom Builder Quote Request</strong>
      </div>

      <h2>🎨 New Custom Builder Quote Request</h2>
      
      <div class="field">
        <div class="field-label">Customer Name</div>
        <div class="field-value">${data.customerName || 'Not provided'}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Email Address</div>
        <div class="field-value"><a href="mailto:${data.customerEmail}" style="color: #D4AF37;">${data.customerEmail || 'Not provided'}</a></div>
      </div>
      
      <div class="field">
        <div class="field-label">Category</div>
        <div class="field-value">${data.category}</div>
      </div>

      ${data.selectedItems && data.selectedItems.length > 0 ? `
      <div class="field">
        <h3 style="color: #D4AF37; margin-bottom: 15px;">Selected Items:</h3>
        <div class="collections-grid">
          ${data.selectedItems.map(item => `
            <div class="collection-item">
              <div class="collection-title">${item.name}</div>
              <div class="collection-desc">Quantity: ${item.quantity}</div>
              <div style="color: #D4AF37; font-weight: 600;">$${item.price * item.quantity}</div>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

      ${data.customization ? `
      <div class="field">
        <div class="field-label">Personal Message</div>
        <div class="field-value">${data.customization.message || 'None'}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Packaging</div>
        <div class="field-value">${data.customization.packaging}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Delivery</div>
        <div class="field-value">${data.customization.delivery}</div>
      </div>
      ` : ''}

      ${data.totalPrice ? `
      <div class="highlight-box">
        <h3>💰 Total Estimated Price: $${data.totalPrice}</h3>
        <p>This is the preliminary estimate based on selected items. Final pricing may vary based on customizations.</p>
      </div>
      ` : ''}

      <div class="highlight-box">
        <h3>⏰ Action Required</h3>
        <p>Please prepare a detailed quote and respond within 24 hours. Custom builder requests require immediate attention and personalized pricing.</p>
      </div>
    `;

    // Customer email content with enhanced styling
    const customerContent = `
      <h2>🎨 Your Custom Creation Awaits!</h2>
      <p>Dear Valued Customer,</p>
      
      <div class="field">
        <h3 style="color: #D4AF37; margin-bottom: 15px;">Thank You for Your Custom Request!</h3>
        <p>We're excited to help you create the perfect custom ${data.category.toLowerCase()} that reflects your unique vision and style. Our team is already working on preparing a detailed quote for your personalized creation.</p>
      </div>

      ${data.selectedItems && data.selectedItems.length > 0 ? `
      <div class="field">
        <h3 style="color: #2C1810; margin-bottom: 15px;">Your Selected Items:</h3>
        <div class="collections-grid">
          ${data.selectedItems.map(item => `
            <div class="collection-item">
              <div class="collection-title">${item.name}</div>
              <div class="collection-desc">Quantity: ${item.quantity}</div>
              <div style="color: #D4AF37; font-weight: 600;">$${item.price * item.quantity}</div>
            </div>
          `).join('')}
        </div>
        ${data.totalPrice ? `
        <div class="highlight-box">
          <h3>💰 Estimated Total: $${data.totalPrice}</h3>
          <p>This is a preliminary estimate. Final pricing will be confirmed in your detailed quote.</p>
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

      <div class="steps-container">
        <h3 style="color: #2C1810; text-align: center; margin-bottom: 30px;">What Happens Next?</h3>
        
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h4>Quote Preparation (24 hours)</h4>
            <p>Our team will prepare a detailed quote with final pricing, timeline, and any additional options.</p>
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h4>Quote Review</h4>
            <p>We'll send you a comprehensive quote via email for your review and approval.</p>
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h4>Creation Process</h4>
            <p>Once approved, we'll begin crafting your custom piece with meticulous attention to detail.</p>
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h4>Quality & Delivery</h4>
            <p>Final quality check and careful packaging for delivery to your door.</p>
          </div>
        </div>
      </div>

      <div class="contact-info">
        <h3>📞 Contact Information</h3>
        <p style="text-align: center; margin-bottom: 20px;">Our custom creation team will be in touch soon, but if you have any immediate questions:</p>
        <div class="contact-grid">
          <div class="contact-item">
            <strong>Email</strong>
            <a href="mailto:custom@luxecollections.com">custom@luxecollections.com</a>
          </div>
          <div class="contact-item">
            <strong>Phone</strong>
            <a href="tel:+1234567890">+1 (234) 567-890</a>
          </div>
          <div class="contact-item">
            <strong>WhatsApp</strong>
            <a href="https://wa.me/1234567890">+1 (234) 567-890</a>
          </div>
        </div>
      </div>
    `;

    const result = await sendDualEmails(
      data.customerEmail || 'customer@example.com',
      `New Custom Builder Quote Request - ${COMPANY_NAME}`,
      adminContent,
      `Your Custom Quote Request - ${COMPANY_NAME}`,
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