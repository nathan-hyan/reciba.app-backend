export default interface invoice {
  invoiceNumber: number;
  logo?: string;
  date: Date | number;
  from: string;
  amountText: string;
  amount: number;
  concept: string;
  sign?: string;
  currency: string;
}
