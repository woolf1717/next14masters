/// <reference types="stripe-event-types" />

import { type NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest): Promise<Response> {
  console.log("Received webhook");
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("Missing WEBHOOK_SECRET");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
    typescript: true,
  });

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return new Response("No signature", { status: 400 });
  }
  const event = stripe.webhooks.constructEvent(
    await request.text(),
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  ) as Stripe.DiscriminatedEvent;

  switch (event.type) {
    case "checkout.session.completed": {
      event.data.object.metadata?.cartId;
      console.log("Checkout session completed");
    }
    case "payment_intent.succeeded": {
      event.data.object;
    }
  }

  return new Response("OK", { status: 200 });
}
