// eslint-disable-next-line import/prefer-default-export
export function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}