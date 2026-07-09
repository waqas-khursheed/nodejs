// Resolves the effective unit price for a product, taking a specific stock
// variation's own discount into account first, then falling back to the
// product-level discount, then the plain price.
export const computeUnitPrice = (product, stock) => {
  if (stock) {
    if (stock.stock_dis_percentage > 0) {
      const base = stock.stock_price ?? product.price;
      return Number((base - (base * stock.stock_dis_percentage) / 100).toFixed(2));
    }
    if (stock.stock_dis_price > 0) {
      return Number(stock.stock_dis_price);
    }
    return Number(stock.stock_price ?? product.price);
  }

  if (product.d_percentage > 0) {
    return Number((product.price - (product.price * product.d_percentage) / 100).toFixed(2));
  }
  if (product.d_price > 0) {
    return Number(product.d_price);
  }
  return Number(product.price);
};
