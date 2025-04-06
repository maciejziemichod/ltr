export class OrderItemError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "OrderItemError";
    }
}
