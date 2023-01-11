import { UNAUTHORIZED_ERR_CODE } from '../utils/errorsCodes.js';
import HttpError from './HttpError.js';

export default class UnauthorizedError extends HttpError {
  constructor(message) {
    super(UNAUTHORIZED_ERR_CODE, message);
    this.name = 'UnauthorizedError';
  }
}
