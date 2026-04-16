import { describe, it, expect } from 'vitest';

const sum = (a: number, b: number) => a + b;

describe('basic math', () => {
  it('adds two numbers', () => {
    expect(sum(2, 3)).toBe(5);
  });

  it('sanity check', () => {
    expect(true).toBe(true);
  });
});
