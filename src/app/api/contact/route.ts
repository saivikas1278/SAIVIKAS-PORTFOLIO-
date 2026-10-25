import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// In-memory rate limiting map: IP -> timestamp[]
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  
  // Filter out timestamps outside the active window
  const recentTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  
  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, recentTimestamps);
    return true;
  }
  
  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP identification for rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "anonymous-client";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Rate limit reached. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    // 2. Parse Request Body
    const body = await req.json();
    const { name, email, subject, message, website } = body;

    // 3. Honeypot check against bot automated spam
    if (website && typeof website === "string" && website.trim() !== "") {
      // Deceptive success response to bots
      return NextResponse.json(
        { success: true, message: "Message accepted." },
        { status: 200 }
      );
    }

    // 4. Server-Side Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters long." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== "string" || subject.trim().length < 3) {
      return NextResponse.json(
        { error: "Subject must be at least 3 characters long." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    const recipient = process.env.CONTACT_RECEIVER_EMAIL || "cheepusaivikas549@gmail.com";
    const apiKey = process.env.RESEND_API_KEY;

    // 5. Send Email via Resend if API key is provided
    if (apiKey) {
      const resend = new Resend(apiKey);

      const emailResult = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: recipient,
        replyTo: email.trim(),
        subject: `[Portfolio Contact] ${subject.trim()} - from ${name.trim()}`,
        text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nSubject: ${subject.trim()}\n\nMessage:\n${message.trim()}`,
      });

      if (emailResult.error) {
        console.error("Resend API error:", emailResult.error);
        return NextResponse.json(
          { error: "Failed to deliver message via email provider." },
          { status: 502 }
        );
      }
    } else {
      // Development fallback when RESEND_API_KEY is not yet in .env
      console.log("[DEV MODE] Contact form submission received:", {
        name,
        email,
        subject,
        message,
        recipient,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully! Sai Vikas will reply shortly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API internal error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while processing message." },
      { status: 500 }
    );
  }
}
