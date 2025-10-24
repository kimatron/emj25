import { loadStripe } from '@stripe/stripe-js';

// Your Stripe publishable key
const stripePublishableKey = 'pk_test_51SLVphAtKse6jThUnFea1U8hrHWeLDT1LaDYHoyechEwvZsTetTi6pL0VMcSzdpW2uzfcvHeKQv1VmBrJVJzJfBU005IYKrNmT';

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
        console.log('Starting checkout with items:', items);
        
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

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server response:', errorText);
            
            let errorMessage = 'Failed to create checkout session';
            try {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.error || errorMessage;
            } catch (e) {
                errorMessage = errorText || errorMessage;
            }
            
            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('Checkout data received:', data);

        const { sessionId, url } = data;

        if (!sessionId && !url) {
            throw new Error('No session ID or URL returned from server');
        }

        // Modern Stripe API: Use the URL directly (preferred method)
        if (url) {
            console.log('Redirecting to Stripe checkout:', url);
            window.location.href = url;
            if (onSuccess) onSuccess();
            return;
        }

        // Fallback: Load Stripe and use session ID
        console.log('Using sessionId fallback');
        const stripe = await loadStripe(stripePublishableKey);
        
        if (!stripe) {
            throw new Error('Stripe failed to load');
        }

        // Use the modern method that doesn't require redirectToCheckout
        window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
        
        if (onSuccess) onSuccess();

    } catch (error: any) {
        console.error('Checkout error:', error);
        if (onError) {
            onError(error);
        } else {
            alert(`Payment failed: ${error.message || 'Please try again.'}`);
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

    } catch (error: any) {
        console.error('Demo checkout error:', error);
        onError(error);
    }
};