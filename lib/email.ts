import nodemailer from 'nodemailer';

export interface QuoteItemPayload {
  product_code: string;
  name: string;
  category: string;
  quantity: number;
  product_link?: string;
}

export interface QuoteRequestPayload {
  customerName: string;
  email: string;
  phone: string;
  notes?: string;
  items: QuoteItemPayload[];
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

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
 * Sends a quote request notification email to the site owner.
 */
export async function sendQuoteRequestEmail(quote: QuoteRequestPayload) {
  const orderEmail = process.env.ORDER_EMAIL || 'orders@laferlasports.co.za';

  const itemsHtml = quote.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}${
        item.product_link
          ? ` <a href="${item.product_link}" style="color:#b11217;">(view)</a>`
          : ''
      }</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.product_code}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.category}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
    </tr>`
    )
    .join('');

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 640px; margin: 0 auto; padding: 20px; }
    .header { background-color: #0b0b0b; color: white; padding: 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 20px; }
    .content { background-color: #f8f9fa; padding: 20px; }
    .section { margin-bottom: 20px; }
    .section-title { font-weight: bold; color: #0b0b0b; margin-bottom: 10px; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th { background-color: #0b0b0b; color: white; padding: 10px; text-align: left; }
    .footer { text-align: center; padding: 20px; color: #6c757d; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>New Quote Request — Laferla Sports</h1></div>
    <div class="content">
      <div class="section">
        <div class="section-title">Customer</div>
        <p><strong>Name:</strong> ${quote.customerName}</p>
        <p><strong>Email:</strong> ${quote.email}</p>
        <p><strong>Phone:</strong> ${quote.phone}</p>
      </div>

      <div class="section">
        <div class="section-title">Requested Items</div>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th style="text-align: center;">Qty</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
        </table>
      </div>

      ${
        quote.notes
          ? `<div class="section"><div class="section-title">Notes</div><p>${quote.notes}</p></div>`
          : ''
      }

      <div class="section">
        <p><strong>Next steps:</strong> reply to this customer with pricing &amp; availability.</p>
      </div>
    </div>
    <div class="footer">
      <p>Automated notification from the Laferla Sports website.</p>
      <p>Generated at ${new Date().toLocaleString('en-ZA')}</p>
    </div>
  </div>
</body>
</html>`;

  const emailText = `New Quote Request — Laferla Sports

Customer:
Name: ${quote.customerName}
Email: ${quote.email}
Phone: ${quote.phone}

Requested Items:
${quote.items
  .map((item) => `- ${item.name} (SKU ${item.product_code}, ${item.category}) x ${item.quantity}`)
  .join('\n')}

${quote.notes ? `Notes:\n${quote.notes}\n` : ''}
Reply to this customer with pricing and availability.

Generated at ${new Date().toLocaleString('en-ZA')}`;

  try {
    const info = await transporter.sendMail({
      from: `"Laferla Sports" <${process.env.SMTP_USER}>`,
      to: orderEmail,
      subject: `New Quote Request from ${quote.customerName}`,
      text: emailText,
      html: emailHtml,
      replyTo: quote.email,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send quote request email');
  }
}

/**
 * Sends a contact form message to the site owner.
 */
export async function sendContactEmail(contact: ContactMessagePayload) {
  const contactEmail = process.env.CONTACT_EMAIL || process.env.ORDER_EMAIL || 'info@laferlasports.co.za';

  const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 640px; margin: 0 auto; padding: 20px;">
    <div style="background:#0b0b0b;color:#fff;padding:20px;text-align:center;">
      <h1 style="margin:0;font-size:20px;">New Contact Message — Laferla Sports</h1>
    </div>
    <div style="background:#f8f9fa;padding:20px;">
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      ${contact.phone ? `<p><strong>Phone:</strong> ${contact.phone}</p>` : ''}
      <p><strong>Subject:</strong> ${contact.subject}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-line;">${contact.message}</p>
    </div>
    <div style="text-align:center;padding:20px;color:#6c757d;font-size:12px;">
      <p>Sent from the Laferla Sports website contact form.</p>
      <p>Generated at ${new Date().toLocaleString('en-ZA')}</p>
    </div>
  </div>
</body>
</html>`;

  const emailText = `New Contact Message — Laferla Sports

Name: ${contact.name}
Email: ${contact.email}
${contact.phone ? `Phone: ${contact.phone}\n` : ''}Subject: ${contact.subject}

Message:
${contact.message}

Generated at ${new Date().toLocaleString('en-ZA')}`;

  try {
    const info = await transporter.sendMail({
      from: `"Laferla Sports" <${process.env.SMTP_USER}>`,
      to: contactEmail,
      subject: `Contact: ${contact.subject} — ${contact.name}`,
      text: emailText,
      html: emailHtml,
      replyTo: contact.email,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw new Error('Failed to send contact message');
  }
}
