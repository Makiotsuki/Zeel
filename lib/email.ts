import nodemailer from 'nodemailer';

// Email configuration using environment variables
const EMAIL_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
};

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@luxecollections.com';
const COMPANY_NAME = process.env.COMPANY_NAME || 'Luxe Collections';
const COMPANY_EMAIL = process.env.COMPANY_EMAIL || 'info@luxecollections.com';
const COMPANY_PHONE = process.env.COMPANY_PHONE || '+1 (234) 567-890';
const COMPANY_ADDRESS = process.env.COMPANY_ADDRESS || '123 Luxury Lane, Premium City, PC 12345';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://luxecollections.com';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter(EMAIL_CONFIG);
};

// Enhanced email templates with elegant wide layout design
export const createEmailTemplate = (content: string, title: string, isAdmin: boolean = false) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap');
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body { 
        font-family: 'Montserrat', Arial, sans-serif; 
        line-height: 1.6; 
        color: #2C1810; 
        margin: 0; 
        padding: 0; 
        background: linear-gradient(135deg, #F9F1E7 0%, #FEFCF9 100%);
        min-height: 100vh;
      }
      
      .email-container {
        max-width: 800px;
        margin: 0 auto;
        background: #ffffff;
        box-shadow: 0 20px 60px rgba(44, 24, 16, 0.1);
        border-radius: 20px;
        overflow: hidden;
        margin-top: 40px;
        margin-bottom: 40px;
      }
      
      .header {
        background: linear-gradient(135deg, #D4AF37 0%, #8B7355 100%);
        color: white;
        padding: 60px 40px;
        text-align: center;
        position: relative;
        overflow: hidden;
      }
      
      .header::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
        opacity: 0.3;
        animation: float 20s ease-in-out infinite;
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      
      .logo {
        font-family: 'Playfair Display', serif;
        font-size: 36px;
        font-weight: 700;
        margin-bottom: 15px;
        position: relative;
        z-index: 2;
        text-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      
      .logo-icon {
        display: inline-block;
        margin-right: 15px;
        font-size: 40px;
        vertical-align: middle;
      }
      
      .tagline {
        font-size: 18px;
        font-weight: 300;
        opacity: 0.95;
        position: relative;
        z-index: 2;
        letter-spacing: 1px;
      }
      
      .content {
        padding: 50px 40px;
        background: #ffffff;
        position: relative;
      }
      
      .content::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #D4AF37 0%, #8B7355 50%, #D4AF37 100%);
      }
      
      .content h1, .content h2, .content h3 {
        font-family: 'Playfair Display', serif;
        color: #2C1810;
        margin-bottom: 20px;
      }
      
      .content h2 {
        font-size: 32px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 30px;
        position: relative;
      }
      
      .content h2::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 3px;
        background: linear-gradient(90deg, #D4AF37 0%, #8B7355 100%);
        border-radius: 2px;
      }
      
      .content h3 {
        font-size: 24px;
        font-weight: 500;
        color: #D4AF37;
        margin-bottom: 15px;
      }
      
      .content p {
        font-size: 16px;
        line-height: 1.8;
        color: #5D4E37;
        margin-bottom: 20px;
      }
      
      .field {
        margin-bottom: 25px;
        padding: 25px;
        background: linear-gradient(135deg, #FEFCF9 0%, #F9F1E7 100%);
        border-radius: 15px;
        border-left: 5px solid #D4AF37;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.1);
        transition: transform 0.3s ease;
      }
      
      .field:hover {
        transform: translateY(-2px);
      }
      
      .field-label {
        font-weight: 600;
        color: #2C1810;
        margin-bottom: 8px;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      .field-value {
        color: #5D4E37;
        font-size: 16px;
        line-height: 1.6;
      }
      
      .highlight-box {
        background: linear-gradient(135deg, #D4AF37 0%, #8B7355 100%);
        color: white;
        padding: 30px;
        border-radius: 15px;
        text-align: center;
        margin: 30px 0;
        box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
      }
      
      .highlight-box h3 {
        color: white;
        font-size: 28px;
        margin-bottom: 15px;
      }
      
      .button {
        display: inline-block;
        background: linear-gradient(135deg, #D4AF37 0%, #8B7355 100%);
        color: white;
        padding: 15px 35px;
        text-decoration: none;
        border-radius: 50px;
        font-weight: 600;
        margin: 15px 10px;
        box-shadow: 0 6px 20px rgba(212, 175, 55, 0.3);
        transition: all 0.3s ease;
        font-size: 16px;
        letter-spacing: 0.5px;
      }
      
      .button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
      }
      
      .collections-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 20px;
        margin: 30px 0;
      }
      
      .collection-item {
        background: white;
        padding: 20px;
        border-radius: 12px;
        text-align: center;
        border: 2px solid #F9F1E7;
        transition: all 0.3s ease;
      }
      
      .collection-item:hover {
        border-color: #D4AF37;
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(212, 175, 55, 0.15);
      }
      
      .collection-icon {
        font-size: 24px;
        margin-bottom: 10px;
      }
      
      .collection-title {
        font-weight: 600;
        color: #2C1810;
        margin-bottom: 5px;
        font-size: 14px;
      }
      
      .collection-desc {
        font-size: 12px;
        color: #8B7355;
        line-height: 1.4;
      }
      
      .steps-container {
        background: #FEFCF9;
        padding: 30px;
        border-radius: 15px;
        margin: 30px 0;
      }
      
      .step {
        display: flex;
        align-items: flex-start;
        margin-bottom: 25px;
        padding: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      }
      
      .step-number {
        background: linear-gradient(135deg, #D4AF37 0%, #8B7355 100%);
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        margin-right: 20px;
        flex-shrink: 0;
        font-size: 16px;
      }
      
      .step-content h4 {
        font-family: 'Playfair Display', serif;
        color: #2C1810;
        margin-bottom: 8px;
        font-size: 18px;
      }
      
      .step-content p {
        color: #5D4E37;
        margin: 0;
        font-size: 14px;
      }
      
      .contact-info {
        background: linear-gradient(135deg, #2C1810 0%, #1A0F08 100%);
        color: white;
        padding: 40px;
        border-radius: 15px;
        margin: 30px 0;
      }
      
      .contact-info h3 {
        color: #D4AF37;
        margin-bottom: 20px;
        text-align: center;
      }
      
      .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }
      
      .contact-item {
        text-align: center;
        padding: 15px;
      }
      
      .contact-item strong {
        color: #D4AF37;
        display: block;
        margin-bottom: 5px;
      }
      
      .contact-item a {
        color: white;
        text-decoration: none;
      }
      
      .contact-item a:hover {
        color: #D4AF37;
      }
      
      .footer {
        background: linear-gradient(135deg, #2C1810 0%, #1A0F08 100%);
        color: white;
        padding: 50px 40px;
        text-align: center;
        position: relative;
      }
      
      .footer::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #D4AF37 0%, #8B7355 50%, #D4AF37 100%);
      }
      
      .footer-content {
        max-width: 600px;
        margin: 0 auto;
      }
      
      .footer h3 {
        font-family: 'Playfair Display', serif;
        color: #D4AF37;
        font-size: 28px;
        margin-bottom: 20px;
      }
      
      .footer p {
        font-size: 16px;
        line-height: 1.8;
        color: #E5E5E5;
        margin-bottom: 15px;
      }
      
      .footer-divider {
        width: 100px;
        height: 2px;
        background: linear-gradient(90deg, #D4AF37 0%, #8B7355 100%);
        margin: 30px auto;
        border-radius: 1px;
      }
      
      .footer-links {
        display: flex;
        justify-content: center;
        gap: 30px;
        margin-top: 30px;
        flex-wrap: wrap;
      }
      
      .footer-links a {
        color: #D4AF37;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s ease;
      }
      
      .footer-links a:hover {
        color: white;
      }
      
      .social-links {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-top: 25px;
      }
      
      .social-link {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: rgba(212, 175, 55, 0.2);
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
        color: #D4AF37;
        text-decoration: none;
        transition: all 0.3s ease;
      }
      
      .social-link:hover {
        background: #D4AF37;
        color: white;
        transform: translateY(-2px);
      }
      
      .admin-priority {
        background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
        color: white;
        padding: 20px;
        border-radius: 10px;
        margin: 20px 0;
        text-align: center;
        font-weight: 600;
      }
      
      .admin-priority .icon {
        font-size: 24px;
        margin-right: 10px;
      }
      
      /* Responsive Design */
      @media only screen and (max-width: 600px) {
        .email-container {
          margin: 20px 10px;
          border-radius: 15px;
        }
        
        .header, .content, .footer {
          padding: 30px 20px;
        }
        
        .logo {
          font-size: 28px;
        }
        
        .tagline {
          font-size: 16px;
        }
        
        .content h2 {
          font-size: 24px;
        }
        
        .collections-grid {
          grid-template-columns: 1fr;
        }
        
        .contact-grid {
          grid-template-columns: 1fr;
        }
        
        .footer-links {
          flex-direction: column;
          gap: 15px;
        }
        
        .step {
          flex-direction: column;
          text-align: center;
        }
        
        .step-number {
          margin: 0 auto 15px auto;
        }
      }
      
      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        .email-container {
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <div class="logo">
          <span class="logo-icon">🎁</span>${COMPANY_NAME}
        </div>
        <div class="tagline">Premium Hampers & Handcrafted Jewelry</div>
      </div>
      
      <div class="content">
        ${content}
      </div>
      
      <div class="footer">
        <div class="footer-content">
          <h3>Thank You for Choosing ${COMPANY_NAME}</h3>
          <p>Creating extraordinary moments, one gift at a time.</p>
          
          <div class="footer-divider"></div>
          
          <div class="contact-info">
            <div class="contact-grid">
              <div class="contact-item">
                <strong>📧 Email</strong>
                <a href="mailto:${COMPANY_EMAIL}">${COMPANY_EMAIL}</a>
              </div>
              <div class="contact-item">
                <strong>📞 Phone</strong>
                <a href="tel:${COMPANY_PHONE.replace(/\D/g, '')}">${COMPANY_PHONE}</a>
              </div>
              <div class="contact-item">
                <strong>📍 Address</strong>
                ${COMPANY_ADDRESS}
              </div>
              <div class="contact-item">
                <strong>🌐 Website</strong>
                <a href="${SITE_URL}">${SITE_URL}</a>
              </div>
            </div>
          </div>
          
          <div class="social-links">
            <a href="#" class="social-link">📘</a>
            <a href="#" class="social-link">📷</a>
            <a href="#" class="social-link">🐦</a>
          </div>
          
          <div class="footer-links">
            <a href="${SITE_URL}/privacy">Privacy Policy</a>
            <a href="${SITE_URL}/terms">Terms of Service</a>
            <a href="${SITE_URL}/shipping">Shipping Info</a>
            <a href="${SITE_URL}/contact">Contact Us</a>
          </div>
          
          <p style="margin-top: 30px; font-size: 14px; color: #8B7355;">
            © 2025 ${COMPANY_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </body>
</html>
`;

// Send email function
export const sendEmail = async (to: string, subject: string, htmlContent: string) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"${COMPANY_NAME}" <${EMAIL_CONFIG.auth.user}>`,
      to,
      subject,
      html: htmlContent
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Send emails to both admin and user
export const sendDualEmails = async (
  userEmail: string,
  adminSubject: string,
  adminContent: string,
  userSubject: string,
  userContent: string
) => {
  try {
    const adminEmailHtml = createEmailTemplate(adminContent, adminSubject, true);
    const userEmailHtml = createEmailTemplate(userContent, userSubject, false);

    // Send to admin
    const adminResult = await sendEmail(ADMIN_EMAIL, adminSubject, adminEmailHtml);
    
    // Send to user
    const userResult = await sendEmail(userEmail, userSubject, userEmailHtml);

    return {
      success: adminResult.success && userResult.success,
      adminResult,
      userResult
    };
  } catch (error) {
    console.error('Error sending dual emails:', error);
    return { success: false, error: error.message };
  }
};