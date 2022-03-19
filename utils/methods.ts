export const parseCurrency = (value: number): string => {
  return value.toLocaleString("es-AR", { style: "currency", currency: "ARS" });
};
