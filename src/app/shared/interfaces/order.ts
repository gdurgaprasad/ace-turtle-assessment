import { Product } from "./product";

export interface OrderHistoryItem {
    id: string;
    itemsOrdered: Product[];
    orderedDate: string;
    orderAmountWithDiscount: number;
    orderAmountWithoutDiscount: number;
    paymentType: string;
  }