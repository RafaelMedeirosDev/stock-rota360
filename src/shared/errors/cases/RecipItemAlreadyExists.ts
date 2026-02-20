import { name } from '../../../../package.json';
import { AlreadyExistsError } from '../base/AlreadyExistsError';

const message = 'Recipe item already exists for this product' as const;
const error = `${name.replace(/-/g, '_')}/recip_item_already_exists` as const;

export class RecipItemAlreadyExists extends AlreadyExistsError{
    constructor(){
        super(message, error)
    }
}
