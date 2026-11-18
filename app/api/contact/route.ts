import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();

    if (!body) {
      return NextResponse.json(
        { error: 'Request body is empty' },
        { status: 400 }
      );
    }

    let name: string | undefined;
    let email: string | undefined;
    let message: string | undefined;

    try {
      const parsed = JSON.parse(body);
      name = parsed.name?.trim();
      email = parsed.email?.trim();
      message = parsed.message?.trim();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields (name, email, message) are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address format' },
        { status: 400 }
      );
    }

    const targetEmail = process.env.CONTACT_EMAIL || 'robertsimeon12345@gmail.com';
    const siteUrl = 'https://simeon-digital-twin.vercel.app';

    // Submit to FormSubmit.co directly to Robert's Gmail
    const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Origin': siteUrl,
        'Referer': `${siteUrl}/`,
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `New Portfolio Inquiry from ${name}`,
        _replyto: email,
        _captcha: 'false',
        _template: 'table',
      }),
    });

    const result = await response.json().catch(() => ({}));

    // FormSubmit one-time activation notice
    if (
      result?.message &&
      typeof result.message === 'string' &&
      result.message.toLowerCase().includes('activation')
    ) {
      return NextResponse.json(
        {
          message:
            'Message recorded! FormSubmit sent a one-time activation link to robertsimeon12345@gmail.com. Check your Gmail inbox/spam and click "Activate Form" once to enable instant delivery.',
          needsActivation: true,
        },
        { status: 200 }
      );
    }

    if (result?.success === 'true' || result?.success === true || response.ok) {
      return NextResponse.json(
        { message: 'Email sent successfully! Robert will get back to you soon.' },
        { status: 200 }
      );
    }

    const errorMsg = result?.message || result?.error || 'Failed to forward email';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  } catch (error: unknown) {
    console.error('Contact form error:', error);
    const err = error as { message?: string };
    return NextResponse.json(
      {
        error:
          err?.message ||
          'Failed to send email. Please email Robert directly at robertsimeon12345@gmail.com',
      },
      { status: 500 }
    );
  }
}
