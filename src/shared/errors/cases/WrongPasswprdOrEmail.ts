import { name } from '../../../../package.json';
import { UnauthorizedError } from '../base/UnauthorizedError';



const message = 'Wrong email or password.' as const;
const error = `${name.replace(/-/g, '_')}/wrong_password_or_email` as const;

export class WrongPasswordOrEmail extends UnauthorizedError {
  constructor() {
    super(message, error);
  }
}
