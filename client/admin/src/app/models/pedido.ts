export interface Pedido {
    name: string | null | undefined;
    address: string | null | undefined;
    tel: string | null | undefined;
    addressComplement: string | null | undefined;
    payment: string | null | undefined;
    finalPrice: number | null | undefined;
    items: Items[]
}

export interface Items {
    orderId: number;
    productId: number;
    qtde: number;
    product: Product[]
}

export interface Product {
    description: string;
    id: number;
    name: string;
    pictureUrl: string;
    price: number;
    productTypeId: number;
}