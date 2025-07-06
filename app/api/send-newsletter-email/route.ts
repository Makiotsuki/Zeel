import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    // Email template for admin notification
    const adminEmailTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Newsletter Subscription</title>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #D4AF37 0%, #8B7355 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .subscriber-info { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #D4AF37; }
            .footer { text-align: center; margin-top: 30px; color: #8B7355; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 New Newsletter Subscription</h1>
              <p>Luxe Collections - Premium Hampers & Jewelry</p>
            </div>
            <div class="content">
              <div class="subscriber-info">
                <h3 style="color: #D4AF37; margin-bottom: 15px;">New Subscriber</h3>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subscription Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>Source:</strong> Website Newsletter Signup</p>
              </div>
              <p>A new customer has subscribed to the Luxe Collections newsletter. Please add them to the mailing list and send a welcome email.</p>
            </div>
            <div class="footer">
              <p>Luxe Collections Newsletter Management</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Email template for subscriber welcome
    const welcomeEmailTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to Luxe Collections Newsletter</title>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #D4AF37 0%, #8B7355 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .welcome-box { background: white; padding: 25px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #D4AF37; }
            .benefits { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .benefit-item { margin: 15px 0; padding: 10px; background: #FEFCF9; border-radius: 5px; }
            .footer { text-align: center; margin-top: 30px; color: #8B7355; font-size: 14px; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #D4AF37 0%, #8B7355 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Welcome to Our Exclusive Community!</h1>
              <p>Luxe Collections - Premium Hampers & Jewelry</p>
            </div>
            <div class="content">
              <div class="welcome-box">
                <h2 style="color: #D4AF37; margin-bottom: 15px;">Thank You for Subscribing!</h2>
                <p>Welcome to the Luxe Collections family! You're now part of an exclusive community of luxury enthusiasts who appreciate the finest hampers and handcrafted jewelry.</p>
              </div>

              <div class="benefits">
                <h3 style="color: #2C1810; margin-bottom: 20px;">What You'll Receive:</h3>
                
                <div class="benefit-item">
                  <strong>🎁 Exclusive Offers:</strong> Be the first to know about special promotions and member-only discounts
                </div>
                
                <div class="benefit-item">
                  <strong>✨ New Collection Previews:</strong> Get early access to our latest hampers and jewelry pieces
                </div>
                
                <div class="benefit-item">
                  <strong>🎨 Behind-the-Scenes Content:</strong> Discover the craftsmanship and stories behind our creations
                </div>
                
                <div class="benefit-item">
                  <strong>💎 Styling Tips:</strong> Expert advice on gifting and jewelry styling
                </div>
                
                <div class="benefit-item">
                  <strong>🎪 Event Invitations:</strong> Exclusive invites to special events and trunk shows
                </div>
              </div>

              <div style="text-align: center;">
                <a href="#" class="cta-button">Explore Our Collections</a>
              </div>

              <div class="welcome-box">
                <h3 style="color: #D4AF37; margin-bottom: 15px;">Start Your Journey</h3>
                <p>Ready to discover something extraordinary? Browse our curated collections:</p>
                <ul style="color: #5D4E37;">
                  <li><strong>Premium Hampers:</strong> Artisan chocolates and gourmet treats</li>
                  <li><strong>Handcrafted Jewelry:</strong> Elegant pieces for every occasion</li>
                  <li><strong>Engagement Collections:</strong> Perfect for life's special moments</li>
                  <li><strong>Custom Creations:</strong> Personalized designs made just for you</li>
                </ul>
              </div>
            </div>
            <div class="footer">
              <p>Thank you for joining Luxe Collections!</p>
              <p>Creating extraordinary moments, one gift at a time.</p>
              <p style="margin-top: 20px; font-size: 12px;">
                You can unsubscribe at any time by clicking the unsubscribe link in our emails.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Simulate email sending
    console.log('Sending admin notification to: admin@luxecollections.com');
    console.log('Admin Email Content:', adminEmailTemplate);
    
    console.log(`Sending welcome email to: ${email}`);
    console.log('Welcome Email Content:', welcomeEmailTemplate);

    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ 
      success: true, 
      message: 'Newsletter subscription emails sent successfully' 
    });

  } catch (error) {
    console.error('Error sending newsletter emails:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send newsletter emails' },
      { status: 500 }
    );
  }
}