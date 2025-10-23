import { loadStripe } from '@stripe/stripe-js';

// Your Stripe publishable key
const stripePublishableKey = 'pk_test_51SLVphAtKse6jThUnFea1U8hrHWeLDT1LaDYHoyechEwvZsTetTi6pL0VMcSzdpW2uzfcvHeKQv1VmBrJVJzJfBU005IYKrNmT';

// Initialize Stripe
const stripePromise = loadStripe(stripePublishableKey);

export interface CheckoutItem {
    name: string;
    description: string;
    price: number; // in euros
    quantity: number;
    image?: string;
}

// Create checkout session via serverless function
export const createCheckout = async (
    items: CheckoutItem[],
    onSuccess?: () => void,
    onError?: (error: any) => void
) => {
    try {
        const stripe = await stripePromise;
        
        if (!stripe) {
            throw new Error('Stripe failed to load');
        }

        // Call serverless function to create checkout session
        const response = await fetch('/api/create-checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: items,
                successUrl: `${window.location.origin}/#/success`,
                cancelUrl: `${window.location.origin}/#/store`,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create checkout session');
        }

        const { sessionId } = await response.json();

        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({ sessionId });

        if (result.error) {
            throw result.error;
        }

        if (onSuccess) onSuccess();

    } catch (error) {
        console.error('Checkout error:', error);
        if (onError) {
            onError(error);
        } else {
            alert('Payment failed. Please try again.');
        }
    }
};

// Demo checkout (for testing before serverless is deployed)
export const demoCheckout = async (
    items: CheckoutItem[],
    onSuccess: (result: any) => void,
    onError: (error: any) => void
) => {
    try {
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = total >= 100 ? 0 : 12.50;
        const grandTotal = total + shipping;

        // Show demo alert
        const proceed = confirm(
            `🛒 DEMO CHECKOUT\n\n` +
            `Items: ${items.length}\n` +
            `Subtotal: €${total.toFixed(2)}\n` +
            `Shipping: €${shipping.toFixed(2)}\n` +
            `Total: €${grandTotal.toFixed(2)}\n\n` +
            `Click OK to simulate successful payment\n` +
            `(Real Stripe integration coming when deployed to Vercel)`
        );

        if (!proceed) {
            throw new Error('Checkout cancelled');
        }

        // Simulate success
        setTimeout(() => {
            onSuccess({
                paid: true,
                items: items,
                total: grandTotal,
                timestamp: new Date().toISOString(),
                orderId: `ORDER-${Date.now()}`,
            });
        }, 1000);

    } catch (error) {
        console.error('Demo checkout error:', error);
        onError(error);
    }
};

export { stripePromise };