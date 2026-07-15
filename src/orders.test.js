import { describe, expect, it } from 'vitest';
import { canSubmit, orderTotal } from './orders.js';

describe('orderTotal', () => {
  it('sums line prices by quantity', () => {
    expect(orderTotal([
      { sku: 'A', unitPrice: 1000, quantity: 2 },
      { sku: 'B', unitPrice: 250, quantity: 1 },
    ])).toBe(2250);
  });

  it('is zero for an empty order', () => {
    expect(orderTotal([])).toBe(0);
  });

  it('rejects a non-array', () => {
    expect(() => orderTotal(null)).toThrow(TypeError);
  });
});

describe('canSubmit', () => {
  it('allows an order with lines', () => {
    expect(canSubmit([{ sku: 'A', unitPrice: 100, quantity: 1 }])).toBe(true);
  });

  it('refuses an empty cart', () => {
    expect(canSubmit([])).toBe(false);
  });
});
