import { NotFoundError } from '../base/NotFoundError';
import { name } from '../../../../package.json';

const message = 'Supply not found.' as const;
const error = `${name.replace(/-/g, '_')}/supply_not_found` as const;

export class SupplyNotFound extends NotFoundError{
    constructor(){
        super(message, error);
    }
}