import { NextRequest, NextResponse } from 'next/server';
import { sendOrderRequestEmail } from '@/lib/email';
import { OrderRequest } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'customerName',
      'email',
      'phone',
      'address',
      'city',
      'province',
      'postalCode',
      'items',
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate items array
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Order must contain at least one item' },
        { status: 400 }
      );
    }

    // Construct order request object
    const orderRequest: OrderRequest = {
      customerName: body.customerName,
      email: body.email,
      phone: body.phone,
      address: body.address,
      city: body.city,
      province: body.province,
      postalCode: body.postalCode,
      items: body.items,
      notes: body.notes || undefined,
    };

    // Send email notification
    // In development, this might fail if SMTP is not configured
    // We'll handle this gracefully
    try {
      await sendOrderRequestEmail(orderRequest);
    } catch (emailError) {
      // Log error but don't fail the request
      // In production, you might want to queue this or use a service
      console.error('Failed to send order email:', emailError);
      
      // In development, we'll still return success
      // In production, you might want to return a warning or queue the email
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          { error: 'Failed to process order request. Please try again or contact us directly.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Order request submitted successfully. We will send you an invoice via email.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing order request:', error);
    return NextResponse.json(
      { error: 'An error occurred processing your order request. Please try again.' },
      { status: 500 }
    );
  }
}

