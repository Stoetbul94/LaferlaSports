import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail, ContactMessagePayload } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const requiredFields = ['name', 'email', 'subject', 'message'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const contact: ContactMessagePayload = {
      name: String(body.name),
      email: String(body.email),
      phone: body.phone ? String(body.phone) : undefined,
      subject: String(body.subject),
      message: String(body.message),
    };

    try {
      await sendContactEmail(contact);
    } catch (emailError) {
      console.error('Failed to send contact email:', emailError);
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          { error: 'Failed to send your message. Please email us directly at info@laferlasports.co.za.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error processing contact message:', error);
    return NextResponse.json(
      { error: 'An error occurred sending your message. Please try again.' },
      { status: 500 }
    );
  }
}
