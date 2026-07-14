import { computeUnitPrice } from "../src/shared/utils/pricing.js";

describe("computeUnitPrice", () => {
  it("falls back to the plain product price when there's no discount and no stock", () => {
    expect(computeUnitPrice({ price: 100, d_percentage: 0, d_price: 0 }, null)).toBe(100);
  });

  it("applies the product-level percentage discount when there's no stock", () => {
    expect(computeUnitPrice({ price: 100, d_percentage: 20, d_price: 0 }, null)).toBe(80);
  });

  it("applies the product-level flat discount price when set and no percentage discount", () => {
    expect(computeUnitPrice({ price: 100, d_percentage: 0, d_price: 60 }, null)).toBe(60);
  });

  it("prefers a stock variation's own percentage discount over the product's", () => {
    const product = { price: 100, d_percentage: 20, d_price: 0 };
    const stock = { stock_price: 200, stock_dis_percentage: 10, stock_dis_price: 0 };
    expect(computeUnitPrice(product, stock)).toBe(180);
  });

  it("falls back to the stock's flat discount price when no percentage discount is set", () => {
    const product = { price: 100 };
    const stock = { stock_price: 200, stock_dis_percentage: 0, stock_dis_price: 150 };
    expect(computeUnitPrice(product, stock)).toBe(150);
  });

  it("uses the stock's own price with no discount when neither stock discount applies", () => {
    const product = { price: 100 };
    const stock = { stock_price: 200, stock_dis_percentage: 0, stock_dis_price: 0 };
    expect(computeUnitPrice(product, stock)).toBe(200);
  });
});
