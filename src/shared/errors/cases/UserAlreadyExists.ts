import { name } from '../../../../package.json';
import { AlreadyExistsError } from '../base/AlreadyExistsError';

const message = 'User Already exists.' as const;
const error = `${name.replace(/-/g, '_')}/user_already_exists` as const;

export class UserAlreadyExists extends AlreadyExistsError{
    constructor(){
        super(message, error)
    }
}
