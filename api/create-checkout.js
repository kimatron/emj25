const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { items, successUrl, cancelUrl } = req.body;

        // Validate items
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Invalid items: must be a non-empty array' });
        }

        console.log('Creating checkout for items:', items);

        // Create line items for Stripe
        const lineItems = items.map(item => {
            if (!item.name || !item.price || !item.quantity) {
                throw new Error('Each item must have name, price, and quantity');
            }
            
            return {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: item.name,
                        description: item.description || '',
                        images: item.image ? [item.image] : [],
                    },
                    unit_amount: Math.round(item.price * 100), // Convert to cents
                },
                quantity: item.quantity,
            };
        });

        // Calculate shipping
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shippingCost = subtotal >= 100 ? 0 : 12.50;

        // Add shipping as line item if applicable
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

        console.log('Creating Stripe session with line items:', lineItems.length);

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
            metadata: {
                orderType: 'print',
                source: 'emjcamera-website',
            },
        });

        console.log('Stripe session created:', session.id);

        // Return both session ID and URL for flexibility
        res.status(200).json({ 
            sessionId: session.id,
            url: session.url 
        });

    } catch (error) {
        console.error('Stripe error:', error);
        res.status(500).json({ 
            error: error.message || 'Internal server error',
            details: error.toString()
        });
    }
};