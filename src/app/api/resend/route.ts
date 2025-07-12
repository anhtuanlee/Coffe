import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const POST = async (req: NextRequest) => {
  try {
    const { name, email, message, phone } = await req.json();
    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND);

    await resend.emails.send({
      from: email,
      to: ['vennn.dev@gmail.com'],
      subject: `New message from ${name.split(' ')[0].toUpperCase() + name.split(' ')[1]}`,
      html: `<p>Name: ${name}</p>
        <p>Email: ${email}</p>
        ${phone ? `<p>Phone: ${phone}</p>` : ''}
        <p>Message: ${message}</p>`,
    });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({ message: error || 'Failed to send email' }, { status: 500 });
  }
};

export { POST };
