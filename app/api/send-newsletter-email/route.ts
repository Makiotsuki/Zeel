import { NextRequest, NextResponse } from 'next/server';
import { sendDualEmails } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    // Admin email content
    const adminContent = `
      <h2>📧 New Newsletter Subscription</h2>
      <div class="field">
        <h3 style="color: #D4AF37; margin-bottom: 15px;">New Subscriber</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subscription Date:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Source:</strong> Website Newsletter Signup</p>
      </div>
      <p>A new customer has subscribed to the Luxe Collections newsletter. Please add them to the mailing list and send a welcome email.</p>
    `;

    // Welcome email content
    const welcomeContent = `
      <h2>🎉 Welcome to Our Exclusive Community!</h2>
      
      <div class="field">
        <h2 style="color: #D4AF37; margin-bottom: 15px;">Thank You for Subscribing!</h2>
        <p>Welcome to the Luxe Collections family! You're now part of an exclusive community of luxury enthusiasts who appreciate the finest hampers and handcrafted jewelry.</p>
      </div>

      <div class="field">
        <h3 style="color: #2C1810; margin-bottom: 20px;">What You'll Receive:</h3>
        
        <div style="margin: 15px 0; padding: 10px; background: #FEFCF9; border-radius: 5px;">
          <strong>🎁 Exclusive Offers:</strong> Be the first to know about special promotions and member-only discounts
        </div>
        
        <div style="margin: 15px 0; padding: 10px; background: #FEFCF9; border-radius: 5px;">
          <strong>✨ New Collection Previews:</strong> Get early access to our latest hampers and jewelry pieces
        </div>
        
        <div style="margin: 15px 0; padding: 10px; background: #FEFCF9; border-radius: 5px;">
          <strong>🎨 Behind-the-Scenes Content:</strong> Discover the craftsmanship and stories behind our creations
        </div>
        
        <div style="margin: 15px 0; padding: 10px; background: #FEFCF9; border-radius: 5px;">
          <strong>💎 Styling Tips:</strong> Expert advice on gifting and jewelry styling
        </div>
        
        <div style="margin: 15px 0; padding: 10px; background: #FEFCF9; border-radius: 5px;">
          <strong>🎪 Event Invitations:</strong> Exclusive invites to special events and trunk shows
        </div>
      </div>

      <div style="text-align: center; margin: 20px 0;">
        <a href="#" class="button">Explore Our Collections</a>
      </div>

      <div class="field">
        <h3 style="color: #D4AF37; margin-bottom: 15px;">Start Your Journey</h3>
        <p>Ready to discover something extraordinary? Browse our curated collections:</p>
        <ul style="color: #5D4E37;">
          <li><strong>Premium Hampers:</strong> Artisan chocolates and gourmet treats</li>
          <li><strong>Handcrafted Jewelry:</strong> Elegant pieces for every occasion</li>
          <li><strong>Engagement Collections:</strong> Perfect for life's special moments</li>
          <li><strong>Custom Creations:</strong> Personalized designs made just for you</li>
        </ul>
      </div>
      
      <p style="margin-top: 20px; font-size: 12px; color: #8B7355;">
        You can unsubscribe at any time by clicking the unsubscribe link in our emails.
      </p>
    `;

    const result = await sendDualEmails(
      email,
      'New Newsletter Subscription - Luxe Collections',
      adminContent,
      'Welcome to Luxe Collections Newsletter',
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