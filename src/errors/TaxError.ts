export class TaxError extends Error {
    constructor(message = "tax percentage cannot be negative") {
        super(message);
        this.name = "TaxError";
    }
}
