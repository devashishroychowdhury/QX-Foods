import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const { email, cart } = await req.json(); // Accept full cart instead of just price

        if (!email || !Array.isArray(cart) || cart.length === 0) {
            return NextResponse.json({ error: "Invalid email or empty cart" }, { status: 400 });
        }

        // Create Stripe customer
        const customer = await stripe.customers.create({ email });

        console.log("Customer ID:", customer.id);

        // Generate `line_items` dynamically from the cart
        const lineItems = cart.map((item) => ({
            quantity: item.quantity,
            price_data: {
                currency: 'INR',
                unit_amount: item.price ? item.price * 100 : 1000, // Ensure valid pricing
                product_data: {
                    name: item.name
                }
            }
        }));

        // Create Stripe checkout session
        const checkOutSession = await stripe.checkout.sessions.create({
            mode: 'payment',
            success_url: `http://localhost:3000/success?token=${customer.id}`,
            cancel_url: `http://localhost:3000/cancel?token=${customer.id}`,
            line_items: lineItems
        });

        return NextResponse.json(
            { msg: 'Checkout session created', url: checkOutSession.url },
            { status: 200 }
        );

    } catch (error) {
        console.error("Stripe error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}