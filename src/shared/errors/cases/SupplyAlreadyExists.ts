import { name } from '../../../../package.json';
import { AlreadyExistsError } from "../base/AlreadyExistsError";

const message = 'Supply already exists.';
const error = `${name.replace(/-/g, '_')}/supply_already_exists` as const;
export class SupplyAlreadeyExists extends AlreadyExistsError {
    constructor(){
        super(message, error);
    }
}