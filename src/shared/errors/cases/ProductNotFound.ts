import { NotFoundError } from '../base/NotFoundError';
import { name } from '../../../../package.json';

const message = 'Product not found.' as const;
const error = `${name.replace(/-/g, '_')}/product_not_found` as const;

export class ProductNotFound extends NotFoundError{
    constructor(){
        super(message, error);
    }
}