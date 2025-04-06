import { OrderItemError } from "../errors/OrderItemError";
import { TaxError } from "../errors/TaxError";
import { Order } from "../models/Order";
import { OrderItem } from "../models/OrderItem";

export function computeOrderItem(
    item: OrderItem,
    taxPercentage: number,
): OrderItem {
    if (taxPercentage < 0) {
        throw new TaxError();
    }
    if (item.net_price < 0) {
        throw new OrderItemError("order item net_price cannot be negative");
    }
    if (item.quantity <= 0) {
        throw new OrderItemError("order item quantity must be greater than 0");
    }

    const net_total = item.net_price * item.quantity;
    const total = net_total + net_total * (taxPercentage / 100);

    return { ...item, net_total, total };
}

export function computeOrder(order: Order, taxPercentage: number): Order {
    if (taxPercentage < 0) {
        throw new TaxError();
    }

    const computedItems = order.items.map((item) => {
        return computeOrderItem(item, taxPercentage);
    });

    const computedOrder = computedItems.reduce(
        (acc, item) => {
            const net_total = item.net_total || 0;
            const tax = (item.total || 0) - net_total;

            acc.net_total += net_total;
            acc.tax += tax;
            acc.total += net_total + tax;

            return acc;
        },
        {
            items: computedItems,
            net_total: 0,
            tax: 0,
            total: 0,
        },
    );

    return computedOrder;
}
