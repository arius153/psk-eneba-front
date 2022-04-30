export class NewListingRequest {
  name: string;
  category: number;
  price: number;
  daysAvailable: string;
  assistedTransportation: string;
  description: string;
  address: string;
  // Image upload komponentas neemitina reikšmės nepadavus inicijuotuos reikšmės
  files: File[] = [];
}
