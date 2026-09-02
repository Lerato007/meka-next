import { NextResponse } from "next/server";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email/send/password-reset";
import crypto from "crypto";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const { success, remaining } = await rateLimit({
    identifier: `forgot_password_${ip}`,
    limit: 3,
    windowSeconds: 60,
  });

  if (!success) {
    return NextResponse.json(
      { error: "Too many password reset requests. Please wait a minute." },
      {
        status: 429,
        headers: { "X-RateLimit-Remaining": remaining.toString() },
      }
    );
  }

  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json({
        message: "If an account exists, a reset link has been sent.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000);

    await prisma.passwordResetToken.create({
      data: {
        email: user.email,
        token,
        expires,
      },
    });

    await sendPasswordResetEmail({
      email: user.email,
      name: user.name || "Customer",
      token,
    });

    return NextResponse.json({
      message: "If an account exists, a reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Failed to process password reset request" },
      { status: 500 }
    );
  }
}