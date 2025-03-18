const intl = Intl.NumberFormat("en-NZ", {
  style: "currency",
  currency: "NZD",
});

export const priceConverter = (price) => intl.format(price);
export default function useCurrency(price) {
  return priceConverter(price);
}
