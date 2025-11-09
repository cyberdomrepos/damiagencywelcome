import { describe, it, expect, beforeEach } from 'vitest';
import { checkRateLimit /*, getRateLimitInfo, resetRateLimitStore */ } from '../lib/rateLimit';

describe('rateLimit', () => {
    beforeEach(() => {
        // If you add a reset helper, call it here:
        // resetRateLimitStore();
    });

    it('allows request under the limit', () => {
        const ip = '127.0.0.1';
        const first = checkRateLimit(ip);
        expect(first.limited).toBe(false);
        expect(first.remaining).toBeGreaterThanOrEqual(0);
    });

    it('blocks after exceeding the limit', () => {
        const ip = '9.9.9.9';
        const max = Number(process.env.RATE_LIMIT_MAX || '3');
        for (let i = 0; i < max; i++) checkRateLimit(ip);
        const last = checkRateLimit(ip);
        expect(last.limited).toBe(true);
    });
});