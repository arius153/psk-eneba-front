export class NewListingRequest {
  id: number;
  name: string;
  category: number;
  price: number;
  daysAvailable: number[] = [];
  assistedTransportation: string;
  description: string;
  address: string;
  files: File[] | string[] = [];
  lat: number;
  lng: number;
  pickUpTimeWeekend: string;
  pickUpTimeWorkDay: string;
  version: number;
  override: boolean;
}
