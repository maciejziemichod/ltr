import { OrderItem } from "./OrderItem";

export interface Order {
    items: OrderItem[];
    net_total?: number;
    tax?: number;
    total?: number;
}
