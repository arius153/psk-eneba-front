// This class contains only essential info to display a listing
// in 'my listings' page.
export class MyListingBrief {
  id: number;
  name: string;
  category: string;
  price: number;
  // 0: hourly, 1: daily
  pricePeriod: number;
  // 0: hidden, 1: available, 2: taken
  status: number;
}
