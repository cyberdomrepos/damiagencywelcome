import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with API key from environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      name,
      email,
      company,
      serviceType,
      phone,
      website,
      preferredContact,
      budget,
      timeline,
      engagementType,
      features,
      platforms,
      notes,
      nda,
      timezone,
    } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Build the email HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #000; color: #fff; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { color: #222; margin-left: 10px; }
            .section { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Quote Request</h1>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Name:</span>
                <span class="value">${name}</span>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <span class="value">${email}</span>
              </div>
              ${company ? `<div class="field"><span class="label">Company:</span><span class="value">${company}</span></div>` : ''}
              ${phone ? `<div class="field"><span class="label">Phone:</span><span class="value">${phone}</span></div>` : ''}
              ${website ? `<div class="field"><span class="label">Website:</span><span class="value">${website}</span></div>` : ''}
              
              <div class="section">
                <h3>Project Details</h3>
                ${serviceType ? `<div class="field"><span class="label">Service Type:</span><span class="value">${serviceType}</span></div>` : ''}
                ${engagementType ? `<div class="field"><span class="label">Engagement Type:</span><span class="value">${engagementType}</span></div>` : ''}
                ${budget ? `<div class="field"><span class="label">Budget:</span><span class="value">${budget}</span></div>` : ''}
                ${timeline ? `<div class="field"><span class="label">Timeline:</span><span class="value">${timeline}</span></div>` : ''}
                ${preferredContact ? `<div class="field"><span class="label">Preferred Contact:</span><span class="value">${preferredContact}</span></div>` : ''}
                ${timezone ? `<div class="field"><span class="label">Timezone:</span><span class="value">${timezone}</span></div>` : ''}
              </div>
              
              ${platforms && platforms.length > 0 ? `
                <div class="section">
                  <h3>Platforms</h3>
                  <div class="value">${platforms.join(', ')}</div>
                </div>
              ` : ''}
              
              ${features && features.length > 0 ? `
                <div class="section">
                  <h3>Key Features</h3>
                  <div class="value">${features.join(', ')}</div>
                </div>
              ` : ''}
              
              ${notes ? `
                <div class="section">
                  <h3>Project Description</h3>
                  <div class="value">${notes.replace(/\n/g, '<br>')}</div>
                </div>
              ` : ''}
              
              ${nda ? `
                <div class="section">
                  <div class="field">
                    <span class="label">⚠️ NDA Required:</span>
                    <span class="value">Yes</span>
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        </body>
      </html>
    `;

    // Plain text version for email clients that don't support HTML
    const textContent = `
New Quote Request

Contact Information:
Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
${phone ? `Phone: ${phone}` : ''}
${website ? `Website: ${website}` : ''}

Project Details:
${serviceType ? `Service Type: ${serviceType}` : ''}
${engagementType ? `Engagement Type: ${engagementType}` : ''}
${budget ? `Budget: ${budget}` : ''}
${timeline ? `Timeline: ${timeline}` : ''}
${preferredContact ? `Preferred Contact: ${preferredContact}` : ''}
${timezone ? `Timezone: ${timezone}` : ''}

${platforms && platforms.length > 0 ? `Platforms: ${platforms.join(', ')}` : ''}
${features && features.length > 0 ? `Key Features: ${features.join(', ')}` : ''}

${notes ? `Project Description:\n${notes}` : ''}

${nda ? '⚠️ NDA Required: Yes' : ''}
    `.trim();

    // Send email using Resend
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.QUOTE_EMAIL || "rhymedominic.costa@damiagency.com",
      replyTo: email,
      subject: `New Quote Request from ${name}`,
      html: htmlContent,
      text: textContent,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Quote request sent successfully",
        emailId: data.data?.id || null
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending quote request:", error);
    return NextResponse.json(
      { 
        error: "Failed to send quote request. Please try again later.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
