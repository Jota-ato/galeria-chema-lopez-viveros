export const formatPrice = (price: number | string): string => {
  const formatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  });
  return formatter.format(Number(price));
};
