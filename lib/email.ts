import nodemailer from 'nodemailer';
import { OrderRequest } from '@/types';

// Email configuration - uses environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Sends an order request notification email to the site owner
 * @param orderRequest - The complete order request data
 * @returns Promise resolving to email info
 */
export async function sendOrderRequestEmail(orderRequest: OrderRequest) {
  const orderEmail = process.env.ORDER_EMAIL || 'orders@laferlasports.co.za';
  
  // Format items for email
  const itemsHtml = orderRequest.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.product.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">R ${item.product.price.toLocaleString()}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">R ${(item.product.price * item.quantity).toLocaleString()}</td>
    </tr>
  `
    )
    .join('');

  const totalPrice = orderRequest.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #212529; color: white; padding: 20px; text-align: center; }
    .content { background-color: #f8f9fa; padding: 20px; }
    .section { margin-bottom: 20px; }
    .section-title { font-weight: bold; color: #212529; margin-bottom: 10px; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th { background-color: #212529; color: white; padding: 10px; text-align: left; }
    .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 10px; }
    .footer { text-align: center; padding: 20px; color: #6c757d; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Order Request - Laferla Sports</h1>
    </div>
    <div class="content">
      <div class="section">
        <div class="section-title">Customer Information</div>
        <p><strong>Name:</strong> ${orderRequest.customerName}</p>
        <p><strong>Email:</strong> ${orderRequest.email}</p>
        <p><strong>Phone:</strong> ${orderRequest.phone}</p>
      </div>
      
      <div class="section">
        <div class="section-title">Delivery Address</div>
        <p>${orderRequest.address}</p>
        <p>${orderRequest.city}, ${orderRequest.province} ${orderRequest.postalCode}</p>
      </div>
      
      <div class="section">
        <div class="section-title">Order Items</div>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th style="text-align: center;">Quantity</th>
              <th style="text-align: right;">Unit Price</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
        <div class="total">Total: R ${totalPrice.toLocaleString()}</div>
      </div>
      
      ${orderRequest.notes ? `
      <div class="section">
        <div class="section-title">Customer Notes</div>
        <p>${orderRequest.notes}</p>
      </div>
      ` : ''}
      
      <div class="section">
        <p><strong>Next Steps:</strong></p>
        <ol>
          <li>Review the order request</li>
          <li>Verify product availability</li>
          <li>Prepare and send invoice to customer</li>
          <li>Arrange shipping upon payment confirmation</li>
        </ol>
      </div>
    </div>
    <div class="footer">
      <p>This is an automated notification from Laferla Sports order system.</p>
      <p>Generated at ${new Date().toLocaleString('en-ZA')}</p>
    </div>
  </div>
</body>
</html>
  `;

  const emailText = `
New Order Request - Laferla Sports

Customer Information:
Name: ${orderRequest.customerName}
Email: ${orderRequest.email}
Phone: ${orderRequest.phone}

Delivery Address:
${orderRequest.address}
${orderRequest.city}, ${orderRequest.province} ${orderRequest.postalCode}

Order Items:
${orderRequest.items
  .map(
    (item) =>
      `- ${item.product.name} (Qty: ${item.quantity}) - R ${(item.product.price * item.quantity).toLocaleString()}`
  )
  .join('\n')}

Total: R ${totalPrice.toLocaleString()}

${orderRequest.notes ? `Customer Notes:\n${orderRequest.notes}\n` : ''}

Next Steps:
1. Review the order request
2. Verify product availability
3. Prepare and send invoice to customer
4. Arrange shipping upon payment confirmation

Generated at ${new Date().toLocaleString('en-ZA')}
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Laferla Sports" <${process.env.SMTP_USER}>`,
      to: orderEmail,
      subject: `New Order Request from ${orderRequest.customerName}`,
      text: emailText,
      html: emailHtml,
      replyTo: orderRequest.email,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send order request email');
  }
}


