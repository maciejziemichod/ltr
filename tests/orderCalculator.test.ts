import { expect, test, describe } from "vitest";
import {
    computeOrderItem,
    computeOrder,
} from "../src/services/orderCalculator";
import { TaxError } from "../src/errors/TaxError";
import { OrderItemError } from "../src/errors/OrderItemError";

describe("computeOrderItem", () => {
    test("should correctly compute net_total and total for a valid OrderItem", () => {
        const item = computeOrderItem({ net_price: 100, quantity: 2 }, 10);

        expect(item.net_total).toBe(200);
        expect(item.total).toBe(220);
    });

    test("should correctly handle valid OrderItem with net_price = 0", () => {
        const item = computeOrderItem({ net_price: 0, quantity: 1 }, 20);

        expect(item.net_total).toBe(0);
        expect(item.total).toBe(0);
    });

    test("should throw TaxError if taxPercentage is negative", () => {
        expect(() => {
            computeOrderItem({ net_price: 1, quantity: 1 }, -1);
        }).toThrowError(TaxError);
    });

    test("should throw OrderItemError if net_price is negative", () => {
        expect(() => {
            computeOrderItem({ net_price: -1, quantity: 1 }, 1);
        }).toThrowError(OrderItemError);
    });

    test("should throw OrderItemError if quantity is less than or equal to 0", () => {
        expect(() => {
            computeOrderItem({ net_price: 1, quantity: 0 }, 1);
        }).toThrowError(OrderItemError);

        expect(() => {
            computeOrderItem({ net_price: 1, quantity: -1 }, 1);
        }).toThrowError(OrderItemError);
    });
});

describe("computeOrder", () => {
    test("should correctly compute order with multiple items", () => {
        const tests = [
            {
                testItem: { net_price: 10, quantity: 2 },
                result: { net_total: 20, total: 22 },
            },
            {
                testItem: { net_price: 20, quantity: 3 },
                result: { net_total: 60, total: 66 },
            },
        ];

        const order = computeOrder(
            {
                items: tests.map(({ testItem }) => testItem),
            },
            10,
        );

        order.items.forEach((item, i) => {
            expect(item.net_total).toBe(tests[i].result.net_total);
            expect(item.total).toBe(tests[i].result.total);
        });

        expect(order.items.length).toBe(2);
        expect(order.net_total).toBe(80);
        expect(order.tax).toBe(8);

        expect(order.total).toBe(88);
    });

    test("should correctly handle order with 0 items", () => {
        const order = computeOrder({ items: [] }, 1.5);

        expect(order.items.length).toBe(0);
        expect(order.net_total).toBe(0);
        expect(order.tax).toBe(0);
        expect(order.total).toBe(0);
    });

    test("should throw TaxError if taxPercentage is negative", () => {
        expect(() => {
            computeOrder({ items: [] }, -1);
        }).toThrowError(TaxError);
    });
});
