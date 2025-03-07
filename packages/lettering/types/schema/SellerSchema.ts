interface SellerSchema {
  _id: string;
  marketName: string;
  images: string[];
  lat: number;
  lng: number;
  location: string;
  sellerName: string;
  id: string;
  pw: string;
  businessNumber: number;
  mutualName: string;
  startDay: string;
  endDay: string;
  startTime: string;
  endTime: string;
  originalInfo: string;
  introduction: string;
  openedAt: Date;
  closedAt: Date;
  mininumReservationDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
