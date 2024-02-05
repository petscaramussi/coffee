export interface CartItem {
    name: string | null | undefined;
    address: string | null | undefined;
    tel: string | null | undefined;
    addressComplement: string | null | undefined;
    payment: string | null | undefined;
    Items: Items[]
}

interface Items {
    productId: number;
    qtde: number;
}