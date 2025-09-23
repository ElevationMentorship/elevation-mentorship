// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_DB = process.env.MONGODB_DB as string;

// Postmark configuration
const POSTMARK_API_TOKEN = process.env.POSTMARK_API_TOKEN;
const FROM_EMAIL = process.env.FROM_EMAIL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

interface ContactFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  areaOfInterest: string;
  message: string;
}

// Send email via Postmark API
const sendPostmarkEmail = async (
  to: string,
  subject: string,
  htmlBody: string,
  from: string = FROM_EMAIL!
) => {
  const response = await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": POSTMARK_API_TOKEN!,
    },
    body: JSON.stringify({
      From: from,
      To: to,
      Subject: subject,
      HtmlBody: htmlBody,
      MessageStream: "outbound",
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Postmark API error: ${error.Message || response.statusText}`
    );
  }

  return response.json();
};

// Email templates
const createUserEmailTemplate = (data: ContactFormData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #3ED5A8; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .footer { background-color: #0A1B1A; color: white; padding: 15px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Contacting Us!</h1>
        </div>
        <div class="content">
          <p>Dear ${data.fullName},</p>
          <p>Thank you for reaching out to us. We have received your inquiry and will get back to you within 24-48 hours.</p>
          
          <h3>Your Submission Details:</h3>
          <ul>
            <li><strong>Name:</strong> ${data.fullName}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Phone:</strong> ${data.phoneNumber}</li>
            <li><strong>Area of Interest:</strong> ${data.areaOfInterest}</li>
            <li><strong>Message:</strong> ${data.message}</li>
          </ul>
          
          <p>We appreciate your interest in our services and look forward to connecting with you soon.</p>
        </div>
        <div class="footer">
          <p>Best regards,<br>Elevation Mentorship Team</p>
          <p>Info@elevationmentorship.co.uk</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const createAdminEmailTemplate = (data: ContactFormData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #17569D; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .urgent { color: #e74c3c; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Form Submission</h1>
        </div>
        <div class="content">
          <p class="urgent">New contact form submission received!</p>
          
          <h3>Contact Details:</h3>
          <ul>
            <li><strong>Full Name:</strong> ${data.fullName}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Phone Number:</strong> ${data.phoneNumber}</li>
            <li><strong>Area of Interest:</strong> ${data.areaOfInterest}</li>
          </ul>
          
          <h3>Message:</h3>
          <p style="background-color: white; padding: 15px; border-left: 4px solid #3ED5A8;">
            ${data.message}
          </p>
          
          <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: ContactFormData = await request.json();

    // Validate required fields
    const { fullName, phoneNumber, email, areaOfInterest, message } = body;

    if (!fullName || !phoneNumber || !email || !areaOfInterest) {
      return NextResponse.json(
        { error: "Missing required fields" },
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

    // Connect to MongoDB
    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db(MONGODB_DB);
    const collection = db.collection("contacts");

    // Create document to save
    const contactDocument = {
      ...body,
      submittedAt: new Date(),
      status: "new",
      source: "website_contact_form",
    };

    // Save to database
    const result = await collection.insertOne(contactDocument);

    // Close database connection
    await client.close();

    // Send emails via Postmark
    const userEmailPromise = sendPostmarkEmail(
      email,
      "Thank you for contacting Elevation Mentorship",
      createUserEmailTemplate(body)
    );

    const adminEmailPromise = sendPostmarkEmail(
      ADMIN_EMAIL!,
      `New Contact Form Submission - ${fullName}`,
      createAdminEmailTemplate(body)
    );

    // Send both emails
    await Promise.all([userEmailPromise, adminEmailPromise]);

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        error: "Failed to process contact form",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}
