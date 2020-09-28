const { getInvoices } = require("../routes/helper/queryBuilder");

test("Devuelve un objeto según el query", () => {
  expect(getInvoices("Hola", "ARS")).toEqual({
    userId: "Hola",
    currency: "ARS",
  });

  expect(getInvoices("Hola")).toEqual({
    userId: "Hola",
  });

  expect(getInvoices("", "ARS")).toEqual({
    currency: "ARS",
  });
  expect(getInvoices("", "")).toEqual({});
  expect(getInvoices(undefined)).toEqual({});
  expect(getInvoices("", "", "nada de nada")).toEqual({});
});
