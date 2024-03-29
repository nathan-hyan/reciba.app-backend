export interface CustomRequest extends Request {
  header: (param0: string) => string;
  user: UserType;
  query: Query;
  params: Params;
  logo?: string;
  body: ReadableStream<Uint8Array> & (EmailType & InvoiceType & UserType);
}

interface DocumentResult<T> {
    _doc: T;
}



type Query = {
  from: string,
  to: string,
  tags: string
  types: 'check' | 'transfer' | 'cash' | 'creditcard';
}

export type UserType = {
  id: string;
  lastInvoiceNumber: number;
  password: string,
  token: string,
  storedToken: string,
  name: string
  logo?: string,
}

type Params = {
  id: string;
}

export interface InvoiceType extends DocumentResult<InvoiceType> {
  invoiceNumber: number;
  date: string;
  from: string;
  amountText: string;
  amount: number;
  concept: string;
  currency: string;
  sign: string;
}

type EmailType = {
  invoiceId: string;
  from: string;
  to: string;
  file: string;
  date: string;
  email: string;
}