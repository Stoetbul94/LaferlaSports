import { NextRequest, NextResponse } from 'next/server';
import { sendQuoteRequestEmail, QuoteRequestPayload } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const requiredFields = ['customerName', 'email', 'phone', 'items'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: 'Quote request must contain at least one item' }, { status: 400 });
    }

    const quoteRequest: QuoteRequestPayload = {
      customerName: String(body.customerName),
      email: String(body.email),
      phone: String(body.phone),
      notes: body.notes ? String(body.notes) : undefined,
      items: body.items.map((item: Record<string, unknown>) => ({
        product_code: String(item.product_code ?? ''),
        name: String(item.name ?? ''),
        category: String(item.category ?? ''),
        quantity: Number(item.quantity ?? 1),
        product_link: item.product_link ? String(item.product_link) : undefined,
      })),
    };

    try {
      await sendQuoteRequestEmail(quoteRequest);
    } catch (emailError) {
      console.error('Failed to send quote email:', emailError);
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          { error: 'Failed to process quote request. Please try again or contact us directly.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { success: true, message: 'Quote request submitted successfully. We will email you a quote shortly.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing quote request:', error);
    return NextResponse.json(
      { error: 'An error occurred processing your quote request. Please try again.' },
      { status: 500 }
    );
  }
}
