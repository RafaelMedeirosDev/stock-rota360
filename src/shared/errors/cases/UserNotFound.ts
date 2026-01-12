import { name } from '../../../../package.json';

import { NotFoundError } from '../base/NotFoundError';

const message = 'User not found.' as const;
const error = `${name.replace(/-/g, '_')}/user_not_found` as const;

export class UserNotFound extends NotFoundError {
  constructor() {
    super(message, error);
  }
}
