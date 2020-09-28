const queryBuilder = {};

/**
 * Arma un objeto para ser usado como query en
 * Mongoose
 *
 * @param {string} userId Id del usuario a filtrar
 * @param {string} currency Tipo de moneda
 */
queryBuilder.getInvoices = (userId, currency) => {
  let query = {};

  if (userId) {
    query.userId = userId;
  }

  if (currency) {
    query.currency = currency;
  }

  return query;
};

module.exports = queryBuilder;
