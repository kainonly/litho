export interface Product {
    id: string;
    created_at: string;
    updated_at: string;
    org_id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    active: boolean;
}
