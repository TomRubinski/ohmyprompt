import Stripe from 'stripe';
import { stripe } from './stripe';

// Cache for validated sessions (in-memory, consider Redis for production)
const sessionCache = new Map<string, {
    email: string;
    customerId: string;
    expiresAt: number;
}>();

const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Validates a Stripe checkout session ID and returns session details
 * @param sessionId - The Stripe checkout session ID
 * @returns Session details if valid, null if invalid or expired
 */
export async function validateStripeSession(sessionId: string): Promise<{
    email: string;
    customerId: string;
    subscriptionId?: string;
} | null> {
    try {
        // Check cache first
        const cached = sessionCache.get(sessionId);
        if (cached && cached.expiresAt > Date.now()) {
            return {
                email: cached.email,
                customerId: cached.customerId,
            };
        }

        // Retrieve session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['subscription'],
        });

        // Validate session
        if (session.payment_status !== 'paid') {
            console.log('[STRIPE_SESSION] Session not paid:', sessionId);
            return null;
        }

        // Check if session is expired (24 hours)
        const sessionCreatedAt = session.created * 1000; // Convert to milliseconds
        const isExpired = Date.now() - sessionCreatedAt > CACHE_TTL;

        if (isExpired) {
            console.log('[STRIPE_SESSION] Session expired:', sessionId);
            return null;
        }

        const email = session.customer_details?.email;
        const customerId = session.customer as string;

        if (!email || !customerId) {
            console.log('[STRIPE_SESSION] Missing email or customer ID:', sessionId);
            return null;
        }

        // Cache the result
        sessionCache.set(sessionId, {
            email,
            customerId,
            expiresAt: Date.now() + CACHE_TTL,
        });

        return {
            email,
            customerId,
            subscriptionId: typeof session.subscription === 'string'
                ? session.subscription
                : session.subscription?.id,
        };
    } catch (error) {
        console.error('[STRIPE_SESSION] Error validating session:', error);
        return null;
    }
}

/**
 * Retrieves customer details from Stripe
 * @param customerId - The Stripe customer ID
 * @returns Customer details or null if not found
 */
export async function getStripeCustomer(customerId: string) {
    try {
        const customer = await stripe.customers.retrieve(customerId);

        if (customer.deleted) {
            return null;
        }

        return customer;
    } catch (error) {
        console.error('[STRIPE_CUSTOMER] Error retrieving customer:', error);
        return null;
    }
}

/**
 * Checks if a customer has an active subscription
 * @param customerId - The Stripe customer ID
 * @returns True if customer has active subscription, false otherwise
 */
export async function hasActiveSubscription(customerId: string): Promise<boolean> {
    try {
        const subscriptions = await stripe.subscriptions.list({
            customer: customerId,
            status: 'active',
            limit: 1,
        });

        return subscriptions.data.length > 0;
    } catch (error) {
        console.error('[STRIPE_SUBSCRIPTION] Error checking subscription:', error);
        return false;
    }
}
