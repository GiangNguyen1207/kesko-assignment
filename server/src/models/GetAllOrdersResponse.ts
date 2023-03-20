export interface GetAllOrderResponse {
  id: number;
  customerName: string;
  shipAddress: string;
  shipCity: string;
  shipRegion: string;
  shipPostalCode: string;
  shipCountry: string;
  shippedDate: string;
  products: string[];
}
