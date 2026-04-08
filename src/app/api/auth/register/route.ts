export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["BUYER", "SELLER"]),
});

export async function POST(req: Request) {
  const { prisma } = await import("@/app/lib/prisma");
  try {
    const body = await req.json();
    const { name, email, password, role } = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        passwordHash,
        role,
      },
    });

    // If seller, optionally create a profile placeholder (can be expanded later)
    if (role === "SELLER") {
      await prisma.sellerProfile.create({
        data: {
            userId: user.id,
            bio: `Handcrafted artisan since ${new Date().getFullYear()}`,
        }
      });
    }

    return NextResponse.json(
      { message: "User registered successfully", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.issues[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Internal server error during registration" },
      { status: 500 }
    );
  }
}
