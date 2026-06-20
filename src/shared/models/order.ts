export interface Order {
    id: string;
    created_at: string;
    org_id: string;
    user_id: string;
    no: string;
    amount: number;
    /** 0 待付款，1 已付款，2 已完成，3 已取消 */
    status: number;
    scheduled_at: string;
    remark: string;
    paid_at?: string;
    closed_at?: string;
}

export interface OrderItem {
    id: string;
    order_id: string;
    product_id: string;
    product_name: string;
    price: number;
    quantity: number;
    subtotal: number;
}
