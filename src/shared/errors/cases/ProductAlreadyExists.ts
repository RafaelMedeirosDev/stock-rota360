import { name } from '../../../../package.json';
import { AlreadyExistsError } from '../base/AlreadyExistsError';

const message = 'Product Already exists.' as const;
const error = `${name.replace(/-/g, '_')}/product_already_exists` as const;

export class ProductAlreadyExists extends AlreadyExistsError{
    constructor(){
        super(message, error)
    }
}
