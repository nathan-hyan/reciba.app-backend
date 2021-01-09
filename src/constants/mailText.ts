export const petitionToSign = (from: string, invoiceId: string): string => {
  return `
  <h1>¡Hola!</h1>
  <br><br/>
  <p><b>${from}</b> te ha enviado esta boleta para ser firmada,
  hacé click en <a href='https://reciba.app/#/offlinesignature/${invoiceId}'>este link</a> para ir</p>

  <p>En caso de que no hayas estado esperando este mail, Es mejor ignorarlo.`;
};

export const invoiceReadyMessage = `
  <h1>¡Tu comprobante está listo!</h1>
  <br></br>
  <p>Muchas gracias por confiar en nosotros</p>
  `;
