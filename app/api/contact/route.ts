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
    
    let name, email, message;
    try {
      const parsed = JSON.parse(body);
      name = parsed.name;
      email = parsed.email;
      message = parsed.message;
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Using Formspree (free and easy to set up)
    // Your Formspree form ID
    const FORMSPREE_ID = 'mblerkbl';

    const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `New Contact from ${name} - Portfolio Website`,
        _replyto: email,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send email');
    }

    return NextResponse.json(
      { message: 'Email sent successfully! I\'ll get back to you soon.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again or contact me directly at robertsimeon12345@gmail.com' },
      { status: 500 }
    );
  }
}
