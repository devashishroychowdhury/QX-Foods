import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        // Parse request body safely
        const body = await req.json();
        console.log("Parsed Request Body:", body);

        const { email, cart } = body;

        if (!email || !cart || !Array.isArray(cart)) {
            return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
        }

        // Create Stripe customer
        const customer = await stripe.customers.create({
            email,
            address: {
                city: "Washington",
                country: "US",
                line1: "Sample Address",
                postal_code: '121651',
                state: "America"
            },
            name: 'John Doe'
        });

        console.log("Customer ID:", customer.id);

        // Ensure valid cart items
        const line_items = cart.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: { name: item.name },
                unit_amount: item.price && !isNaN(item.price) ? Math.round(item.price * 100) : 1000,
            },
            quantity: Math.max(1, item.quantity),
        }));

        // Create checkout session
        const checkOutSession = await stripe.checkout.sessions.create({
            mode: 'payment',
            success_url: `http://localhost:3000/success?token=${customer.id}`,
            cancel_url: `http://localhost:3000/cancel?token=${customer.id}`,
            line_items,
        });

        console.log("Checkout Session:", checkOutSession);

        return NextResponse.json(
            { msg: 'Checkout session created', url: checkOutSession.url },
            { status: 200 }
        );
    } catch (error) {
        console.error("Payment API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}