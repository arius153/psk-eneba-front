export class NewListingRequest {
  name: string;
  category: number;
  price: number;
  daysAvailable: number[] = [];
  assistedTransportation: string;
  description: string;
  address: string;
  // Image upload komponentas neemitina reikšmės nepadavus inicijuotuos reikšmės
  files: File[] = [];
  lat: number;
  lng: number;
  pickUpTimeWeekend: string;
  pickUpTimeWorkDay: string;
}
