import { name } from '../../../../package.json';
import { InsufficientStockError } from '../base/InsufficientStockError';

const message = 'Insufficient stock to complete the operation.' as const;
const error = `${name.replace(/-/g, '_')}/insufficient_stock` as const;

export class InsufficientStock extends InsufficientStockError {
    constructor() {
        super(message, error)
    }
}