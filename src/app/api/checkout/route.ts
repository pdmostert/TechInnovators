export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { checkoutSchema } from "@/app/lib/validations/checkout";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Server-side validation using the shared schema
    const result = checkoutSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { 
          message: "Validation failed", 
          errors: result.error.flatten().fieldErrors 
        }, 
        { status: 400 }
      );
    }
    
    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // In a real app, you would create an order record here and integrate with Stripe/PayPal
    const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    return NextResponse.json({ 
      success: true, 
      message: "Order placed successfully!", 
      orderId 
    }, { status: 201 });
    
  } catch (error) {
    console.error("Checkout API Error:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred during checkout." }, 
      { status: 500 }
    );
  }
}
