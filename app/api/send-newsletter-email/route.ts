import { NextRequest, NextResponse } from 'next/server';
import { sendDualEmails } from '@/lib/email';

const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || 'Luxe Collections';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    // Admin email content with enhanced styling
    const adminContent = `
      <h2>📧 New Newsletter Subscription</h2>
      
      <div class="field">
        <h3 style="color: #D4AF37; margin-bottom: 15px;">New Subscriber Details</h3>
        <div class="field-label">Email Address</div>
        <div class="field-value"><a href="mailto:${email}" style="color: #D4AF37;">${email}</a></div>
      </div>
      
      <div class="field">
        <div class="field-label">Subscription Date</div>
        <div class="field-value">${new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Source</div>
        <div class="field-value">Website Newsletter Signup</div>
      </div>

      <div class="highlight-box">
        <h3>📝 Action Required</h3>
        <p>A new customer has subscribed to the ${COMPANY_NAME} newsletter. Please add them to the mailing list and ensure they receive future communications.</p>
      </div>
    `;

    // Welcome email content with enhanced styling
    const welcomeContent = `
      <h2>🎉 Welcome to Our Exclusive Community!</h2>
      
      <div class="field">
        <h3 style="color: #D4AF37; margin-bottom: 15px;">Thank You for Subscribing!</h3>
        <p>Welcome to the <strong>${COMPANY_NAME}</strong> family! You're now part of an exclusive community of luxury enthusiasts who appreciate the finest hampers and handcrafted jewelry.</p>
      </div>

      <div class="steps-container">
        <h3 style="color: #2C1810; text-align: center; margin-bottom: 30px;">What You'll Receive:</h3>
        
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h4>🎁 Exclusive Offers</h4>
            <p>Be the first to know about special promotions and member-only discounts</p>
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h4>✨ New Collection Previews</h4>
            <p>Get early access to our latest hampers and jewelry pieces</p>
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h4>🎨 Behind-the-Scenes Content</h4>
            <p>Discover the craftsmanship and stories behind our creations</p>
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h4>💎 Styling Tips</h4>
            <p>Expert advice on gifting and jewelry styling</p>
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">5</div>
          <div class="step-content">
            <h4>🎪 Event Invitations</h4>
            <p>Exclusive invites to special events and trunk shows</p>
          </div>
        </div>
      </div>

      <div style="text-align: center; margin: 40px 0;">
        <a href="#" class="button">Explore Our Collections</a>
      </div>

      <div class="field">
        <h3 style="color: #D4AF37; margin-bottom: 15px;">Start Your Journey</h3>
        <p>Ready to discover something extraordinary? Browse our curated collections:</p>
      </div>
      
      <div class="collections-grid">
        <div class="collection-item">
          <div class="collection-icon">🍫</div>
          <div class="collection-title">Premium Hampers</div>
          <div class="collection-desc">Artisan chocolates and gourmet treats</div>
        </div>
        <div class="collection-item">
          <div class="collection-icon">💎</div>
          <div class="collection-title">Handcrafted Jewelry</div>
          <div class="collection-desc">Elegant pieces for every occasion</div>
        </div>
        <div class="collection-item">
          <div class="collection-icon">💍</div>
          <div class="collection-title">Engagement Collections</div>
          <div class="collection-desc">Perfect for life's special moments</div>
        </div>
        <div class="collection-item">
          <div class="collection-icon">🎨</div>
          <div class="collection-title">Custom Creations</div>
          <div class="collection-desc">Personalized designs made just for you</div>
        </div>
      </div>
      
      <p style="margin-top: 40px; font-size: 14px; color: #8B7355; text-align: center; font-style: italic;">
        You can unsubscribe at any time by clicking the unsubscribe link in our emails. We respect your privacy and will never share your information.
      </p>
    `;

    const result = await sendDualEmails(
      email,
      `New Newsletter Subscription - ${COMPANY_NAME}`,
      adminContent,
      `Welcome to ${COMPANY_NAME} Newsletter`,
      welcomeContent
    );

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Newsletter subscription emails sent successfully' 
      });
    } else {
      throw new Error('Failed to send emails');
    }

  } catch (error) {
    console.error('Error sending newsletter emails:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send newsletter emails' },
      { status: 500 }
    );
  }
}