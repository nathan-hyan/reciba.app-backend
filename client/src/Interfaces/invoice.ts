export interface invoice {
  _id?: string;
  invoiceNumber: number;
  logo?: string;
  date: Date | string;
  from: string;
  amountText: string;
  amount: number;
  concept: string;
  sign?: string;
  currency: string;
  pending: boolean;
  tags?: string[];
  alreadySent?: {
    isAlreadySent: Boolean;
    emailAddress?: String;
  };
}

export interface queryType {
  from?: string;
  to?: string;
}
