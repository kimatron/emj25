// Stripe Checkout Serverless Function
// Location: /api/create-checkout.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { items, successUrl, cancelUrl } = req.body;

        // Validate items
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Invalid items' });
        }

        // Create line items for Stripe
        const lineItems = items.map(item => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.name,
                    description: item.description,
                    images: item.image ? [item.image] : [],
                },
                unit_amount: Math.round(item.price * 100), // Convert euros to cents
            },
            quantity: item.quantity,
        }));

        // Add shipping costs as a line item
        const shippingCost = calculateShipping(items);
        if (shippingCost > 0) {
            lineItems.push({
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: 'Shipping & Handling',
                        description: 'Standard delivery',
                    },
                    unit_amount: Math.round(shippingCost * 100),
                },
                quantity: 1,
            });
        }

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: successUrl || `${req.headers.origin}/#/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: cancelUrl || `${req.headers.origin}/#/store`,
            shipping_address_collection: {
                allowed_countries: ['IE', 'GB', 'US', 'CA', 'AU', 'FR', 'DE', 'ES', 'IT', 'NL', 'BE'],
            },
            customer_email: req.body.customerEmail || undefined,
            metadata: {
                orderType: 'print',
                source: 'emjcamera-website',
            },
        });

        // Return session ID to client
        res.status(200).json({ sessionId: session.id });

    } catch (error) {
        console.error('Stripe error:', error);
        res.status(500).json({ error: error.message });
    }
}

// Calculate shipping cost based on items
function calculateShipping(items) {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    
    // Free shipping over €100
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (subtotal >= 100) {
        return 0;
    }
    
    // €12.50 for first item, €5 for each additional
    if (totalItems === 1) {
        return 12.50;
    } else {
        return 12.50 + ((totalItems - 1) * 5);
    }
}