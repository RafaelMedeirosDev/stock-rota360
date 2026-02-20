import { name } from '../../../../package.json';
import { AlreadyExistsError } from '../base/AlreadyExistsError';

const message = 'ONLY PREPARED products can have recipe itens.' as const
const error = `${name.replace(/-/g, '_')}/product_cannot_have_recipe` as const

export class ProductCannotHaveRecipe extends AlreadyExistsError{
    constructor(){
        super(message, error)
    }
}