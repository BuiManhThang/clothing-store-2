export interface CreateOrderDetailDTO {
  sizeId: string;
  quantity: number;
  price: any;
  orderId: string;
  productId: string;
  colorId: string;
  productCode: string;
  productName: string;
  colorCode: string;
  colorName: string;
  sizeName: string;
}

export interface UpdateOrderDetailDTO {
  sizeId: string;
  quantity: number;
  price: any;
  orderId: string;
  productId: string;
  colorId: string;
  productCode: string;
  productName: string;
  colorCode: string;
  colorName: string;
  sizeName: string;
}

export interface ViewOrderDetailDTO {
  sizeId: string;
  quantity: number;
  price: any;
  orderId: string;
  productId: string;
  colorId: string;
  productCode: string;
  productName: string;
  colorCode: string;
  colorName: string;
  sizeName: string;
}
