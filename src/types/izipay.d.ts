declare class Izipay {
  constructor(config: any);
  LoadForm(params: any): void;
}

type IzipayResponse = {
  code: string;
  message: string;
  messageUser?: string;
  response: {
    merchantCode: string;
    currency: string;
    amount: string;
    orderNumber: string;
    dateTransaction: string;
    timeTransaction: string;
    payMethod: string;
    card: {
      brand: string;
      pan: string;
      save: boolean;
    };
    billing: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      street: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
      documentType: string;
      document: string;
      companyName: string;
    };
    signature: string;
    payloadHttp: string;
  };
};
