export default interface invoice {
  invoiceNumber: number;
  logo?: string;
  date: string;
  from: string;
  amountText: string;
  amount: number;
  concept: string;
  sign?: string;
  currency: string;
}
